//
const fillTextNodes = (selection, obj, name) => {
    selection.map((item, i) => {
        if (typeof obj[i] !== "undefined") {
            figma.loadFontAsync(item.fontName).then(() => {
                item.characters = obj[i][name];
            });
        }
    });
};
const fillImageNodes = (selection, obj, response, imageIndex) => {
    if (selection[imageIndex]) {
        let imageHash = figma.createImage(response).hash;
        selection[imageIndex].fills = [
            { type: "IMAGE", scaleMode: "FILL", imageHash }
        ];
    }
    else {
        return;
    }
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 320 });
const matchNames = (selection, obj) => {
    let JSONKeys = Object.keys(obj[0]);
    selection.map((item, i) => {
        // console.log(Object.keys(obj[0]));
    });
};
figma.ui.onmessage = (msg) => {
    if (msg.type === "change-size") {
        // console.log(msg.obj);
        figma.ui.resize(280, 540);
    }
    if (msg.type === "selected-text") {
        // console.log(msg.obj);
        fillTextNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    }
    if (msg.type === "selected-image") {
        // console.log(msg.obj);
        fillImageNodes(figma.currentPage.selection, msg.obj, msg.response, msg.i);
    }
    if (msg.type === "auto-bind") {
        // console.log(msg.obj);
        const selected = figma.currentPage.selection;
        matchNames(selected, msg.obj);
        // console.log(figma.currentPage.selection);
        if (selected.length > 0) {
            figma.currentPage.selection.map((item) => {
                console.log(item["children"]);
            });
        }
        else {
            console.error("Nothing selected");
        }
    }
};
