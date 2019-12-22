let getNodes = (selection, obj, name) => {
    selection.map((item, i) => {
        if (typeof obj[i] !== "undefined") {
            // console.log(item.characters);
            // item.characters = "sd";
            // console.log(obj[i][name]);
            figma.loadFontAsync(item.fontName).then(() => {
                item.characters = obj[i][name];
            });
        }
    });
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 320 });
figma.ui.onmessage = (msg) => {
    getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    // if (msg.type === "selected") {
    //   // console.log(msg.obj);
    //   getNodes(figma.currentPage.selection, msg.obj);
    // }
};
