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
figma.showUI(__html__, { width: 280, height: 820 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "change-size") {
        figma.ui.resize(280, 820);
    }
    if (figma.currentPage.selection.length <= 0 && msg.type !== "change-size") {
        alert("Please select layers");
    }
    else {
        if (msg.type === "selected-text") {
            fillTextNodes(figma.currentPage.selection, msg.newObj, msg.buttonName);
        }
        else if (msg.type === "string-template-text") {
            console.log(figma.currentPage.selection);
        }
        else if (msg.type === "by-layer-name-text") {
            const allNodesWithChildren = figma.currentPage.selection.filter((item) => {
                if (item["children"]) {
                    return item["children"];
                }
            });
            const allSubling = allNodesWithChildren.map((item) => {
                return item;
            });
            console.log(allSubling);
        }
    }
};
