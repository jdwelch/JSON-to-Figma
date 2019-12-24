//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let getNodes = (selection, obj, name) => __awaiter(this, void 0, void 0, function* () {
    selection.map((item, i) => __awaiter(this, void 0, void 0, function* () {
        if (typeof obj[i] !== 'undefined') {
            if (item.type === 'TEXT') {
                figma.loadFontAsync(item.fontName).then(() => {
                    item.characters = obj[i][name];
                });
            }
            else {
                try {
                    // const fills = Array.from(item.fills);
                    // console.log(fills);
                    // const image = figma.getImageByHash(item.fills[0].imageHash);
                    // const imageBytes = await image.getBytesAsync();
                    //
                    // fills.push({
                    //   type: 'IMAGE',
                    //   visible: true,
                    //   opacity: 1,
                    //   scaleMode: 'FILL',
                    //   imageHash: figma.createImage(imageBytes).hash
                    // });
                    // item.fills = fills;
                    // await downloadImage(
                    //   'https://api.codetabs.com/v1/proxy?quest=https://thispersondoesnotexist.com/image?=23'
                    // );
                    // let data = msg[1] as Uint8Array
                    // let imageHash = figma.createImage(new Uint8Array(data)).hash
                    // console.log(item.fills[0]);
                    // const image = figma.getImageByHash(item.imageHash);
                    // const bytes = await image.getBytesAsync();
                }
                catch (e) {
                    console.error(e);
                    // expected output: "Parameter is not a number!"
                }
                // console.log('end');
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
    }));
});
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 420 });
figma.ui.onmessage = msg => {
    // getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    if (msg.type === 'selected') {
        // console.log(msg.obj);
        figma.ui.resize(280, 380);
        getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    }
};
