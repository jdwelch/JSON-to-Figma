const fillTextNodes = (selection, obj, name) => {
  selection.map((item, i) => {
    if (typeof obj[i] !== 'undefined') {
      figma.loadFontAsync(item.fontName).then(() => {
        item.characters = obj[i][name];
      });
    }
  });
};

const pluginInitialHeight = 264;
const pluginInitialWidth = 280;

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: pluginInitialWidth,
  height: pluginInitialHeight
});

figma.ui.onmessage = msg => {
  if (msg.type === 'change-size' || msg.type === 'reset') {
    figma.ui.resize(pluginInitialWidth, msg.frameHeight + 30);
  }

  if (
    figma.currentPage.selection.length <= 0 &&
    msg.type !== 'change-size' &&
    msg.type !== 'reset'
  ) {
    alert('Please select layers');
  } else {
    if (msg.type === 'selected-text') {
      fillTextNodes(figma.currentPage.selection, msg.newObj, msg.buttonName);
    } else if (msg.type === 'string-template-text') {
      let newItem = 0;

      function getAllId(arr, btnName, JSONobj, key) {
        arr.map(item => {
          for (let keys in item) {
            if (
              typeof item[key] !== 'undefined' &&
              item[key].includes(`{${btnName}}`)
            ) {
              if (keys === key) {
                figma.loadFontAsync(item.fontName).then(() => {
                  item.characters = item.characters.replace(
                    `{${btnName}}`,
                    JSONobj[newItem][btnName]
                  );
                  newItem = ++newItem;
                });
              }
            } else if (Array.isArray(item[keys])) {
              getAllId(item[keys], btnName, JSONobj, key);
            }
          }
        });
      }

      getAllId(
        figma.currentPage.selection,
        msg.buttonName,
        msg.newObj,
        'characters'
      );
    } else if (msg.type === 'by-layer-name-text') {
      let newItem = 0;

      function getAllLayers(arr, btnName, JSONobj, key) {
        arr.map(item => {
          for (let keys in item) {
            if (item['name'] === btnName) {
              if (keys === key) {
                figma.loadFontAsync(item.fontName).then(() => {
                  item.characters = JSONobj[newItem][btnName];
                  newItem = ++newItem;
                });
              }
            } else if (Array.isArray(item[keys])) {
              getAllLayers(item[keys], btnName, JSONobj, key);
            }
          }
        });
      }

      getAllLayers(
        figma.currentPage.selection,
        msg.buttonName,
        msg.newObj,
        'characters'
      );
    }
  }
};
