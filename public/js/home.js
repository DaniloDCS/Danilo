const apps = {
  AppsOfTimer: [{
    name: "Weather",
    icon: "fas fa-cloud",
    available: false
  }, {
    name: "Calendar",
    icon: "fas fa-calendar-days",
    available: false
  }, {
    name: "Clock",
    icon: "fas fa-clock",
    available: false
  }, {
    name: "Countdown",
    icon: "fas fa-stopwatch-20",
    available: false
  }, {
    name: "Pomodoro",
    icon: "fas fa-apple-whole",
    available: false
  }, {
    name: "Reminder",
    icon: "fas fa-bell",
    available: false
  }, {
    name: "Timer",
    icon: "fas fa-stopwatch",
    available: false
  }],
  forDevs: [{
    name: "Todo",
    icon: "fas fa-clipboard-check",
    available: false
  }, {
    name: "Notes",
    icon: "fas fa-notes-medical",
    available: false
  }, {
    name: "Chat",
    icon: "fas fa-comments",
    available: false
  }, {
    name: "Code",
    icon: "fas fa-terminal",
    available: false
  }, {
    name: "Colorful",
    icon: "fas fa-swatchbook",
    available: false
  }, {
    name: "Painting",
    icon: "fas fa-paintbrush",
    available: false
  }, {
    name: "REST API",
    icon: "fas fa-paper-plane",
    available: false
  }, {
    name: "Border Radius Previewer",
    icon: "fas fa-draw-polygon",
    available: false
  }, {
    name: "Markdown Previewer",
    icon: "fab fa-markdown",
    available: false
  }, {
    name: "Keyboard",
    icon: "fas fa-keyboard",
    available: false
  }],
  mathApps: [{
    name: "Calculator",
    icon: "fas fa-calculator",
    available: false
  }, {
    name: "Calculate the area",
    icon: "fas fa-ruler-horizontal",
    available: false
  }, {
    name: "Calculate the volume",
    icon: "fas fa-whiskey-glass",
    available: false
  }, {
    name: "Temperature converter",
    icon: "fas fa-temperature-low",
    available: false
  }, {
    name: "Convert currency",
    icon: "fas fa-coins",
    available: false
  }, {
    name: "Number Base Convert",
    icon: "fas fa-0",
    available: false
  }],
  otherApps: [{
    name: "Quiz",
    icon: "fas fa-question",
    available: false
  }, {
    name: "Random Numbers",
    icon: "fas fa-repeat",
    available: false
  }, {
    name: "Writing",
    icon: "fas fa-paragraph",
    available: false
  }, {
    name: "Find My Movie",
    icon: "fas fa-clapperboard",
    available: false
  }, {
    name: "Find My Song",
    icon: "fas fa-record-vinyl",
    available: false
  }, {
    name: "Find My Book",
    icon: "fas fa-book",
    available: false
  }, {
    name: "Crop Images",
    icon: "fas fa-pen-ruler",
    available: false
  }],
  games: [{
    name: "Tic-Tac-Toe",
    icon: "fas fa-hashtag",
    available: false
  }, {
    name: "Snake",
    icon: "fas fa-dragon",
    available: false
  }, {
    name: "Pong",
    icon: "fas fa-gamepad",
    available: false
  }, {
    name: "Hangman",
    icon: "fas fa-gamepad",
    available: false
  }]
}

const list = document.getElementById("app-list");
const colorful = ["blue", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "blue-6", "green", "green-1", "any", "any-1", "any-2", "any-3", "any-4", "red", "red-1", "red-2", "red-3", "yellow", "yellow-1", "black", "black-1", "black-2", "black-3", "black-4", "gray", "gray-1", "gray-2", "gray-3", "gray-4", "pink", "pink-1", "pink-2", "pink-3", "orange", "orange-1", "orange-2", "orange-3", "orange-4", "orange-5", "purple", "purple-1", "purple-2", "purple-3", "cyan", "cyan-1", "cyan-2", "cyan-3", "cyan-4", "cyan-5", "ocean", "ocean-1"]

function initializeApps(apps) {
  for (const classification in apps) {
    const classificationElement = createElement("div", {}, {
      className: "classification",
      id: classification.toLowerCase()
    }, {});

    const classificationTitle = createElement("h2", {}, {
      className: "classification-title",
      innerHTML: classification.replace(/([A-Z])/g, ' $1').trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      style: `background-color: var(--${colorful[Math.floor(Math.random() * colorful.length)]})`
    });

    const classificationList = createElement("div", {}, {
      className: "classification-list"
    });

    classificationElement.append(classificationTitle);
    classificationElement.append(classificationList);

    for (const app in apps[classification]) {
      const linkForApp = createElement("a", {
        href: `\\${apps[classification][app].name.toLowerCase().replace(/ /g, "")}`,
        title: `${apps[classification][app].name}`,
      }, {
        className: "app",
        innerHTML: `
        <div class="app-icon"><i class="${apps[classification][app].icon}"></i></div>
          <div class="app-title">${apps[classification][app].name}</div>
        `,
        style: `background-color: var(--${colorful[Math.floor(Math.random() * colorful.length)]})`
      });

      classificationList.append(linkForApp);
    }

    list.append(classificationElement);
  }
}

function createElement(tag, attributes, othersAttributes) {
  const element = document.createElement(tag);

  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  for (const otherAttribute in othersAttributes) {
    element[otherAttribute] = othersAttributes[otherAttribute];
  }

  return element;
}

initializeApps(apps);