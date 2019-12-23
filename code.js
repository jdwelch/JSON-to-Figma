var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function downloadImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        figma.showUI(__html__, { visible: false });
        figma.ui.postMessage(url);
        const newBytes = yield new Promise((resolve, reject) => {
            figma.ui.onmessage = (value) => resolve(value);
        });
        const newPaint = {
            scaleMode: "FILL",
            type: "IMAGE",
            imageHash: figma.createImage(newBytes).hash
        };
        return newPaint;
    });
}
//
let getNodes = (selection, obj, name) => {
    selection.map((item, i) => {
        if (typeof obj[i] !== "undefined") {
            if (item.type === "TEXT") {
                figma.loadFontAsync(item.fontName).then(() => {
                    item.characters = obj[i][name];
                });
            }
            else {
                console.log(item.fills);
                // const fills = Array.from(item.fills);
                // fills.push({
                //   type: 'IMAGE',
                //   visible: true,
                //   opacity: 1,
                //   scaleMode: 'FILL',
                //   imageHash: figma.createImage(imageBytes).hash
                // });
                // item.fills = fills;
            }
        }
    });
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 420 });
figma.ui.onmessage = (msg) => {
    // getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    if (msg.type === "selected") {
        // console.log(msg.obj);
        figma.ui.resize(280, 380);
        getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    }
};
