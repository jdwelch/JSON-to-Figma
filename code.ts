//

let fillTextNodes = (selection, obj, name) => {
  selection.map((item, i) => {
    if (typeof obj[i] !== "undefined") {
      figma.loadFontAsync(item.fontName).then(() => {
        item.characters = obj[i][name];
      });
    }
  });
};

let fillImageNodes = (selection, obj, response, i) => {
  console.log(response);
  selection.map((item, i) => {
    if (typeof obj[i] !== "undefined") {
      // console.log(response);
      //   let data = imArr[i];
      //   let imageHash = figma.createImage(data).hash;
      //   item.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash }];
    }
  });
};

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 280, height: 420 });

figma.ui.onmessage = (msg) => {
  // getNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
  if (msg.type === "selected-text") {
    // console.log(msg.obj);
    figma.ui.resize(280, 480);
    fillTextNodes(figma.currentPage.selection, msg.obj, msg.buttonName);
    console.log("text");
  }
  if (msg.type === "selected-image") {
    // console.log(msg.obj);
    figma.ui.resize(280, 480);
    // console.log(msg.obj);
    // console.log(msg.newBytes);
    // console.log(figma.currentPage.selection);
    fillImageNodes(figma.currentPage.selection, msg.obj, msg.response, msg.i);

    // await fillImageNodes(figma.currentPage.selection, msg.obj, msg.imgArr);
  }
};
