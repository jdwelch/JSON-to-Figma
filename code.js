const fillTextNodes = (selection, obj, name) => {
    selection.map((item, i) => {
        if (typeof obj[i] !== "undefined") {
            figma.loadFontAsync(item.fontName).then(() => {
                item.characters = obj[i][name];
            });
            console.log(`text for the node "${item.name}" changed`);
        }
    });
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 320 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "change-size") {
        // console.log(msg.obj);
        figma.ui.resize(280, 540);
    }
    if (msg.type === "selected-text") {
        // console.log(msg.obj);
        if (figma.currentPage.selection.length > 0) {
            fillTextNodes(figma.currentPage.selection, msg.newObj, msg.buttonName);
        }
        else {
            alert("Please select layers");
        }
    }
};
