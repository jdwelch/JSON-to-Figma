//
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
const fillImageNodes = (selection, obj, response, imageIndex) => {
    if (selection[imageIndex]) {
        let imageHash = figma.createImage(response).hash;
        selection[imageIndex].fills = [
            { type: "IMAGE", scaleMode: "FILL", imageHash }
        ];
        console.log(`text for the node "${selection[imageIndex].name}" changed`);
    }
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 320 });
const matchNames = (selected, obj) => {
    const isPicture = (val) => {
        if (val.toUpperCase().startsWith("HTTPS")) {
            return true;
        }
        else {
            return false;
        }
    };
    const JSONKeys = Object.keys(obj[0]).map((item, i) => {
        return item;
    });
    if (selected.length > 0) {
        selected.map((item, i) => {
            const children = item["children"];
            if (children.length > 0) {
                children.map((item, j) => {
                    if (JSONKeys.includes(item.name)) {
                        const objName = obj[i][item.name];
                        if (isPicture(objName)) {
                            console.log(objName);
                            console.log("image layer");
                        }
                        else {
                            console.log(item);
                            figma.loadFontAsync(item.fontName).then(() => {
                                item.characters = objName;
                            });
                            console.log(`text for the node "${item.name}" changed`);
                        }
                    }
                });
            }
        });
    }
    else {
        console.error("Nothing selected");
    }
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
    }
};
