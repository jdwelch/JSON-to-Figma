async function downloadImage(url) {
  figma.showUI(__html__, { visible: false });

  figma.ui.postMessage(url);

  const newBytes: Uint8Array = await new Promise((resolve, reject) => {
    figma.ui.onmessage = (value) => resolve(value as Uint8Array);
  });

  const newPaint: Paint = {
    scaleMode: "FILL",
    type: "IMAGE",
    imageHash: figma.createImage(newBytes).hash
  };
  return newPaint;
}

//

let getNodes = (selection, obj, name) => {
  selection.map((item, i) => {
    if (typeof obj[i] !== "undefined") {
      if (item.type === "TEXT") {
        figma.loadFontAsync(item.fontName).then(() => {
          item.characters = obj[i][name];
        });
      } else {
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
