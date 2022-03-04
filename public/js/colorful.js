const colorList = document.querySelector("#color-list");
const messageAlert = document.querySelector("#message-alert");
const searchColor = document.querySelector("#search-color");
const btnList = document.querySelector("#btn-list");
const btnCloseModal = document.querySelector("#btn-close-modal");
const history = [];
const favoriteColors = {};
let CURRENT_COLOR = "";

searchColor.setAttribute("oninput", "colorful(this.value)")
btnList.setAttribute("onclick", "showListOfFavoriteColors()");
btnCloseModal.setAttribute("onclick", "showListOfFavoriteColors()");
document.addEventListener("keydown", event => {
  if (event.key === "Enter") colorful();
  if (event.key === "Escape") showListOfFavoriteColors();
})

function favoriteColorRemove(id, father, currentColor) {
  document.querySelector(`#${id}`).remove();
  document.querySelector(`#${father}`).style.color = "white";

  favoriteColors[CURRENT_COLOR] = favoriteColors[CURRENT_COLOR].filter(color => color !== currentColor);
}

let showListColors = false;

function showListOfFavoriteColors() {
  let list = document.querySelector("#list-of-favorites-colors");

  if (showListColors) {
    list.style.display = "none";
    showListColors = false;
  } else {
    list.style.display = "flex";
    showListColors = true;
  }
}

function createAnElement(name, attributes, css) {
  let element = document.createElement(name);

  Object.keys(attributes).forEach(key => {
    if (key === "onClick" || key === "onclick") element.setAttribute(key, attributes[key]);
    if (key === "dataName") element.setAttribute("data-name", attributes[key]);
    else element[key] = attributes[key];
  });

  Object.keys(css).forEach(key => {
    element.style[key] = css[key];
  });

  return element;
}

function favoriteColorAdd(color, element) {

  if (favoriteColors[CURRENT_COLOR] === undefined) favoriteColors[CURRENT_COLOR] = [];
  if (favoriteColors[CURRENT_COLOR].includes(color)) return;

  favoriteColors[CURRENT_COLOR].push(color);

  element.style.color = "yellow";
  messageAlertShow(" <i class='fas fa-star'></i> Your color has been added to favorites", "blue");
  btnList.style.animation = "trim 1.3s";

  let colorItemID = "U" + Math.floor(Date.now() * Math.random()).toString(36);

  let colorItem = createAnElement("div", {
    innerHTML: color,
    className: "favorite-color",
    id: colorItemID,
    dataName: element.id
  }, {
    backgroundColor: color,
  });

  let btnRemoveFavoriteColor = createAnElement("button", {
    className: "btn-remove-favorite-color",
    innerHTML: "<i class='fas fa-trash-alt'></i>",
    onClick: `favoriteColorRemove("${colorItemID}", "${element.id}", "${color}")`
  }, {});

  colorItem.append(btnRemoveFavoriteColor);
  document.querySelector("#favorites-colors").appendChild(colorItem);

  setTimeout(() => {
    btnList.style.animation = "";
  }, 1300)
}

let alertInProgress = false;

function messageAlertShow(text, color) {

  let id = "V" + Math.floor(Date.now() * Math.random()).toString(36);

  let message = createAnElement("div", {
    className: "message-alert",
    innerHTML: `<div class="msg">${text}</div>`,
    id
  }, {
    backgroundColor: color
  });

  let alertProgress = createAnElement("div", {
    className: "alert-progress"
  }, {});

  message.appendChild(alertProgress);
  messageAlert.appendChild(message);

  setTimeout(() => {
    document.querySelector(`#${id}`).remove();
  }, 6000);
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text);
  messageAlertShow(`<i class='fas fa-clipboard'></i> ${message.message}`, message.color);
}

function rgbToHexadecimalColor(color) {
  let hexColor = "";

  color.forEach(code => {
    hexColor += code.toString(16).padStart(2, "0");
  });

  return `#${hexColor.toUpperCase()}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RGBGenerator(tracks = {
  red: [],
  green: [],
  blue: []
}, colorName) {
  let colors = [];

  for (let index = 0; index < 100; index++) {

    let red = random(tracks.red.min, tracks.red.max);
    let green = random(tracks.green.min, tracks.green.max);
    let blue = random(tracks.blue.min, tracks.blue.max);

    if (colorName === "black" || colorName === "gray" || colorName === "white") {
      green = red;
      blue = red;
    }

    if (colorName === "brown" || colorName === "ocean" || colorName === "red") {
      blue = green;
    }

    colors.push(rgbToHexadecimalColor([red, green, blue]));
  }

  createListExhibition(colors);
}

function createListExhibition(list) {

  if (favoriteColors[CURRENT_COLOR]) {

    favoriteColors[CURRENT_COLOR].reverse().forEach(color => {
      list.unshift(color);
    });

    favoriteColors[CURRENT_COLOR].reverse();
  }

  list.forEach(color => {
    let colorItem = createAnElement("div", {
      className: "color-item"
    }, {
      backgroundColor: color,
      gridRow: `span ${Math.floor(Math.random() * (4 - 1)) + 1}`
    });

    let spanColor = createAnElement("span", {
      className: "color-item-color",
      innerHTML: color
    }, {})

    let buttonCopy = createAnElement("button", {
      className: "button-copy",
      innerHTML: "<i class='fas fa-copy'></i>",
      onClick: `copyToClipboard("${color}", { message: "Your color has been copied to clipboard", color: "#550130" })`
    }, {});

    let buttonFavorite = createAnElement("button", {
      className: "button-favorite",
      innerHTML: "<i class='fas fa-star'></i>",
      onClick: `favoriteColorAdd("${color}", this)`,
      id: "B" + Math.floor(Date.now() * Math.random()).toString(36)
    }, {
      color: (favoriteColors[CURRENT_COLOR] && favoriteColors[CURRENT_COLOR].includes(color)) ? "yellow" : "white"
    });

    colorItem.append(spanColor, buttonFavorite, buttonCopy);
    colorList.appendChild(colorItem);
  });
}

function colorful(colorName = "any") {
  colorName = colorName.toLowerCase().replace(/ /g, "");

  CURRENT_COLOR = colorName;

  history.push({
    colorName,
    date: new Date()
  })

  colorList.innerHTML = "";

  let tracks = {
    red: {
      min: 0,
      max: 0
    },
    green: {
      min: 0,
      max: 0
    },
    blue: {
      min: 0,
      max: 0
    }
  };

  if (colorName === "black") {
    tracks.red.min = 0;
    tracks.red.max = 60;
    tracks.green.min = 0;
    tracks.green.max = 0;
    tracks.blue.min = 0;
    tracks.blue.max = 0;
  } else if (colorName === "blue") {
    tracks.red.min = 0;
    tracks.red.max = 0;
    tracks.green.min = 0;
    tracks.green.max = 100;
    tracks.blue.min = 200;
    tracks.blue.max = 255;
  } else if (colorName === "brown") {
    tracks.red.min = 80;
    tracks.red.max = 120;
    tracks.green.min = 0;
    tracks.green.max = 60;
    tracks.blue.min = 150;
    tracks.blue.max = 200;
  } else if (colorName === "gray") {
    tracks.red.min = 0;
    tracks.red.max = 255;
    tracks.green.min = 0;
    tracks.green.max = 0;
    tracks.blue.min = 0;
    tracks.blue.max = 0;
  } else if (colorName === "green") {
    tracks.red.min = 0;
    tracks.red.max = 80;
    tracks.green.min = 10;
    tracks.green.max = 255;
    tracks.blue.min = 10;
    tracks.blue.max = 80;
  } else if (colorName === "orange") {
    tracks.red.min = 225;
    tracks.red.max = 255;
    tracks.green.min = 100;
    tracks.green.max = 255;
    tracks.blue.min = 0;
    tracks.blue.max = 25;
  } else if (colorName === "pink") {
    tracks.red.min = 240;
    tracks.red.max = 255;
    tracks.green.min = 10;
    tracks.green.max = 150;
    tracks.blue.min = 200;
    tracks.blue.max = 255;
  } else if (colorName === "purple") {
    tracks.red.min = 75;
    tracks.red.max = 120;
    tracks.green.min = 0;
    tracks.green.max = 30;
    tracks.blue.min = 60;
    tracks.blue.max = 150;
  } else if (colorName === "red") {
    tracks.red.min = 65;
    tracks.red.max = 255;
    tracks.green.min = 0;
    tracks.green.max = 50;
    tracks.blue.min = 0;
    tracks.blue.max = 50;
  } else if (colorName === "white") {
    tracks.red.min = 230;
    tracks.red.max = 255;
    tracks.green.min = 230;
    tracks.green.max = 255;
    tracks.blue.min = 230;
    tracks.blue.max = 255;
  } else if (colorName === "yellow") {
    tracks.red.min = 225;
    tracks.red.max = 255;
    tracks.green.min = 200;
    tracks.green.max = 255;
    tracks.blue.min = 20;
    tracks.blue.max = 85;
  } else if (colorName === "cyan") {
    tracks.red.min = 0;
    tracks.red.max = 80;
    tracks.green.min = 150;
    tracks.green.max = 200;
    tracks.blue.min = 150;
    tracks.blue.max = 200;
  } else if (colorName === "ocean") {
    tracks.red.min = 10;
    tracks.red.max = 60;
    tracks.green.min = 40;
    tracks.green.max = 80;
    tracks.blue.min = 150;
    tracks.blue.max = 200;
  } else {
    tracks.red.min = 0;
    tracks.red.max = 255;
    tracks.green.min = 0;
    tracks.green.max = 255;
    tracks.blue.min = 0;
    tracks.blue.max = 255;
  }

  RGBGenerator(tracks, colorName);
}

const colorsNames = ["black", "blue", "brown", "gray", "green", "orange", "pink", "purple", "red", "white", "yellow", "cyan", "ocean"];
const initialColor = colorsNames[Math.floor(Math.random() * colorsNames.length)];

colorful(initialColor);
messageAlertShow("<i class='fas fa-info-circle'></i> Click on a color to copy it to clipboard!", "#EE3C15");

function exportColors(typeFile, typeExport) {

  let a = document.createElement("a");
  let data = "",
    url = "";

  if (typeFile === "json") {
    data = JSON.stringify(favoriteColors);
    let blob = new Blob([data], {
      type: "application/json"
    });
    url = URL.createObjectURL(blob);
  } else if (typeFile === "csv") {
    data = "";

    Object.keys(favoriteColors).forEach(color => {
      data += color + "," + favoriteColors[color].join(",") + "\n";
    });

    let blob = new Blob([data], {
      type: "text/csv"
    });
    url = URL.createObjectURL(blob);
  } else if (typeFile === "css" || typeFile === "txt") {
    data = ":root {\n";

    Object.keys(favoriteColors).forEach(color => {
      favoriteColors[color].forEach((value, index) => {
        data += "\t--" + color + (index > 0 ? "-" + index : "") + ": " + value + ";\n";
      });
    });

    data += "}"

    let blob = new Blob([data], {
      type: "text/${typeFile}"
    });
    url = URL.createObjectURL(blob);
  } else if (typeFile === "html") {
    data = "";

    data += "<style>\n\t:root {\n";

    Object.keys(favoriteColors).forEach(color => {
      favoriteColors[color].forEach((value, index) => {
        data += "\t\t--" + color + (index > 0 ? "-" + index : "") + ": " + value + ";\n";
      });
    });

    data += "\t}\n</style>\n";

    let blob = new Blob([data], {
      type: "text/html"
    });
    url = URL.createObjectURL(blob);
  }

  if (typeExport === "file") {
    messageAlertShow("<i class='fas fa-info-circle'></i> The download is started! Wait a moment!", "#4AA1F6");
    a.href = url;
    a.download = `favorite-colors.${typeFile}`;
    a.click();
  } else {
    copyToClipboard(data, {
      message: "Your code has been copied to clipboard",
      color: "#2E3096"
    })
  }
}