const COMPLETE_CURRENT_DATE = new Date();
const CURRENT_MONTH = COMPLETE_CURRENT_DATE.getMonth();
const CURRENT_YEAR = COMPLETE_CURRENT_DATE.getFullYear();
const CURRENT_DATE = COMPLETE_CURRENT_DATE.getDate();
const CURRENT_DAY = COMPLETE_CURRENT_DATE.getDay();

function namesMonths(language, dateFormat, index) {
  if (Object.keys(dateFormat)[0] === "month") return new Date(2022, index).toLocaleString(language, dateFormat);
  if (Object.keys(dateFormat)[0] === "weekday") return new Date(2022, 2, index + 6).toLocaleString(language, dateFormat);
}

const longNamesOfMonths = Array.from({
  length: 12
}).map((_, index) => namesMonths("en-US", {
  month: "long"
}, index));

const shortNamesOfMonths = Array.from({
  length: 12
}).map((_, index) => namesMonths("en-US", {
  month: "short"
}, index));

const longDaysOfWeek = Array.from({
  length: 7
}).map((_, index) => namesMonths("en-US", {
  weekday: "long"
}, index));

const shortDaysOfWeek = Array.from({
  length: 7
}).map((_, index) => namesMonths("en-US", {
  weekday: "short"
}, index));

const monthsCelebrations = {
  jan: {
    color: "#FFFFFF",
    title: "Mental Health Awareness Month",
    holidays: {
      fixed: {
        1: "New Year's Day"
      },
      variable: []
    }
  },
  feb: {
    color: "#800080",
    title: "Alzheimer's Awareness Month",
    holidays: {
      fixed: {
        14: "Valentine's Day"
      },
      variable: []
    }
  },
  mar: {
    color: "#BAA7D0",
    title: "Cervical Cancer Awareness Month",
    holidays: {
      fixed: {},
      variable: []
    }
  },
  apr: {
    color: "#0000FF",
    title: "Autism Awareness Month",
    holidays: {
      fixed: {
        15: "Passion of Christ",
        17: "Easter",
        21: "Tiradentes Day",
      },
      variable: [],
    }
  },
  may: {
    color: "#800080",
    title: "Inflammatory Bowel Disease Awareness Month",
    holidays: {
      fixed: {
        1: "Labour Day",
      },
      variable: [{
        day: "sun",
        position: 2,
        name: "Mother's Day"
      }]
    }
  },
  jun: {
    color: "#FF0000",
    title: "Blood Donation Awareness Month",
    holidays: {
      fixed: {
        7: "National Press Freedom Day",
        16: "Corpus Christi",
      },
      variable: [],
    }
  },
  jul: {
    color: "#FFFF00",
    title: "Viral Herpes Awareness Month",
    holidays: {
      fixed: {
        25: "Black Latin american and caribbean women's Day",
      },
      variable: [],
    }
  },
  aug: {
    color: "#FFA500",
    title: "Multiple Sclerosis Awareness Month",
    holidays: {
      fixed: {},
      variable: [{
        day: "sun",
        position: 2,
        name: "Father's Day"
      }],
    }
  },
  sep: {
    color: "#FFFF00",
    title: "Suicide Prevention Month",
    holidays: {
      fixed: {
        7: "Independency Day",
        29: "World Heart Day",
      },
      variable: [],
    }
  },
  oct: {
    color: "#EE06EE",
    title: "Breast Cancer Awareness Month",
    holidays: {
      fixed: {
        12: "Children's Day",
        15: "Teachers' Day",
        28: "Public Servant Day",
        31: "Saci Day"
      },
      variable: [],
    }
  },
  nov: {
    color: "#000080",
    title: "Proposal Awareness Month",
    holidays: {
      fixed: {
        2: "All Souls Day",
        15: "Proclamation of the Republic Day",
        20: "Black Consciousness Day",
      },
      variable: [],
    }
  },
  dec: {
    color: "#FF0000",
    title: "HIV Awareness Month",
    holidays: {
      fixed: {
        24: "Christmas Eve",
        25: "Christmas Day",
        31: "New Year's Eve"
      },
      variable: [],
    }
  }
}

function createAnElement(tag, attributes = {}, styles = {}, functions = {}) {
  const element = document.createElement(tag);

  if (attributes) Object.keys(attributes).forEach(key => element[key] = attributes[key]);
  if (styles) Object.keys(styles).forEach(key => element.style[key] = styles[key]);
  if (functions) Object.keys(functions).forEach(key => element.setAttribute(key, functions[key]));

  return element;
}

function currentWeekCalculate(date) {
  date = new Date(date);

  let firstDayYear = new Date(date.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((date - firstDayYear) / (24 * 60 * 60 * 1000));
  let result = (date.getDay() + numberOfDays) / 7;

  return Math.floor(result);
}

function generateWeekOfCalendar(fullDate) {
  fullDate = new Date(fullDate);

  const day = fullDate.getDay(),
    date = fullDate.getDate(),
    month = fullDate.getMonth(),
    year = fullDate.getFullYear();

  const currentMonthQuantityDays = new Date(year, month + 1, 0).getDate();
  const beforeMonthQuantityDays = new Date(year, month, 0).getDate();

  let week = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  };

  week[Object.keys(week)[day]] = date; // Set Full Date Day in week

  // Set before Days
  let beforeDays = date
  let otherDays = 0

  for (let before = day; before > 0; before--) {
    beforeDays--
    if (beforeDays > 0) week[Object.keys(week)[before - 1]] = beforeDays;
    else otherDays++
  }

  otherDays = beforeMonthQuantityDays - otherDays

  if (otherDays != beforeMonthQuantityDays) {
    Object.keys(week).forEach(d => {
      if (week[d] === 0) {
        otherDays++
        week[d] = otherDays
      }
    })
  }

  // Set after Days
  let missingDays = 6 - day
  let nextMonthDaysCounter = 1
  let nextDays = date;

  if (date === currentMonthQuantityDays) {
    for (let missing = (day + 1); missing <= (day + missingDays); missing++) {
      week[Object.keys(week)[missing]] = nextMonthDaysCounter++;
    }
  }

  if (date < currentMonthQuantityDays) {
    for (let missing = (day + 1); missing <= (day + missingDays); missing++) {
      week[Object.keys(week)[missing]] = (nextDays++ < currentMonthQuantityDays) ? nextDays : nextMonthDaysCounter++;
    }
  }

  // Generate Week of Calendar HTML

  let daysGroup = createAnElement('tr', {
    class: 'week-of-calendar'
  });

  let className = "",
    title = "";

  if (CURRENT_DATE === week[day] && month === CURRENT_MONTH && year === CURRENT_YEAR) className = "current-day";

  let currentMonthHolidaysFixed = {};
  const nameMonth = shortNamesOfMonths[month].toLowerCase();

  if (Object.keys(monthsCelebrations[nameMonth].holidays.fixed).length) {
    currentMonthHolidaysFixed = monthsCelebrations[nameMonth].holidays.fixed;
  }

  if (currentMonthHolidaysFixed[week[day]]) {
    className = "holiday"
    title = currentMonthHolidaysFixed[week[day]]
  }

  Object.keys(week).forEach(day => {
    let className = "";
    let title = "";

    if (CURRENT_DATE === week[day]) className = "current-day"

    if (currentMonthHolidaysFixed[week[day]]) {
      className = "holiday"
      title = currentMonthHolidaysFixed[week[day]]
    }

    let dayOfWeek = createAnElement("td", {
      innerText: week[day],
      className
    }, {}, {
      title
    });

    daysGroup.appendChild(dayOfWeek);
  })

  return daysGroup;
}

function generateCalendar(date, style) {
  myCalendarView.innerHTML = "";
  date = new Date(date);

  // Calendar controls
  let controlNext = "";
  let controlBack = "";

  if (style === "monthly") {
    controlNext = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    controlBack = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  } else if (style === "weekly") {
    controlNext = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    controlBack = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  } else if (style === "daily") {
    controlNext = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    controlBack = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  } else if (style === "annually") {
    controlNext = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    controlBack = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
  }

  if (style === "daily") {
    let calendar = createAnElement("div", {
      className: "calendar-daily",
      innerHTML: `
        <i class="fas fa-chevron-left" onclick="generateCalendar('${controlBack}', '${style}')"></i>
        <div class="daily">
          ${date.toLocaleString("en-us", { month: "long", day: "numeric", year: "numeric", weekday: "long" })}
        </div>
        <div class="current-week">
          Week: ${currentWeekCalculate(date)}
        </div>
        <i class="fas fa-chevron-right" onclick="generateCalendar('${controlNext}', '${style}')"></i>
      `
    });

    myCalendarView.appendChild(calendar);
    return;
  }

  let calendarGroup = createAnElement("div", {
    className: "calendar-group " + style,
    innerHTML: (style === "annually" ? `
      <h2>
        ${date.getFullYear()}
        <i onclick="generateCalendar('${controlBack}', '${style}')" class="fas fa-arrow-up"></i>
        <i onclick="generateCalendar('${controlNext}', '${style}')" class="fas fa-arrow-down"></i>
      </h2>
    ` : "")
  });

  let iteration = (style === "annually" ? 12 : 1)

  for (let index = 0; index < iteration; index++) {

    let calendar = createAnElement("table", {
      className: "calendar"
    });

    let calendarHeader = createAnElement("thead", {
      className: "calendar-header"
    });

    let calendarBody = createAnElement("tbody", {
      className: "calendar-body"
    });

    let monthColor = monthsCelebrations[shortNamesOfMonths[(style === "annually" ? index : date.getMonth())].toLowerCase()].color;
    let monthTitle = monthsCelebrations[shortNamesOfMonths[(style === "annually" ? index : date.getMonth())].toLowerCase()].title;

    let calendarHeaderRow = createAnElement("tr", {
      className: "calendar-header-row-details"
    });

    let awarenessMonth = createAnElement("td", {
      className: "awareness-month",
      innerHTML: `<i class="fas fa-ribbon" ${style === "annually" ? (index == 0 ? "style='color: black'" : "") : (date.getMonth() === 0 ? "style='color: black'" : "") }></i>`
    }, {
      backgroundColor: monthColor
    }, {
      title: monthTitle
    });

    let calendarHeaderRowDetails = createAnElement("td", {
      className: "calendar-header-row-details",
      innerHTML: `${ longNamesOfMonths[(style === "annually" ? index : date.getMonth())]} ${style === "weekly" ? date.getFullYear() + " " + `<div class="current-week"> Week: ${currentWeekCalculate(date)} </div>` : (style === "monthly" ? date.getFullYear() : "")}`
    }, {}, {
      colspan: (style === "annually" ? "6" : "4")
    });

    calendarHeaderRow.appendChild(awarenessMonth);
    calendarHeaderRow.appendChild(calendarHeaderRowDetails);


    if (style === "weekly" || style === "monthly") {
      let calendarHeaderRowControlsBack = createAnElement("td", {
        className: "calendar-header-row-controls",
        innerHTML: `<i class="fas fa-arrow-up"></i>`
      }, {}, {
        "onclick": `generateCalendar('${controlBack}', '${style}')`
      });

      let calendarHeaderRowControlsNext = createAnElement("td", {
        className: "calendar-header-row-controls",
        innerHTML: `<i class="fas fa-arrow-down"></i>`
      }, {}, {
        "onclick": `generateCalendar('${controlNext}', '${style}')`
      });

      calendarHeaderRow.appendChild(calendarHeaderRowControlsBack);
      calendarHeaderRow.appendChild(calendarHeaderRowControlsNext);
    }

    let calendarHeaderRow2 = createAnElement("tr", {
      className: "calendar-header-row"
    });

    shortDaysOfWeek.forEach(day => {
      let dayOfWeek = createAnElement("th", {
        innerText: day,
        className: "day-of-week"
      });

      calendarHeaderRow2.appendChild(dayOfWeek);
    });

    if (style === "monthly" || style === "annually") {
      let myMonth = (style === "monthly" ? date.getMonth() + 1 : index + 1)
      for (let w = 0; w < 5; w++) {
        calendarBody.appendChild(generateWeekOfCalendar(`${date.getFullYear()}-${myMonth}-${w * 7 + 1}`));
      }
    } else if (style === "weekly") calendarBody.appendChild(generateWeekOfCalendar(date));

    calendarHeader.appendChild(calendarHeaderRow);
    calendarHeader.appendChild(calendarHeaderRow2);
    calendar.appendChild(calendarHeader);
    calendar.appendChild(calendarBody);
    calendarGroup.appendChild(calendar);
    myCalendarView.appendChild(calendarGroup);
  }
}

// All Constants DOM elements
const [
  myCalendarView,
  btnVisualizationToday,
  btnVisualizationWeekly,
  btnVisualizationMonthly,
  btnVisualizationAnnually
] = [
  "calendar-exhibition",
  "btn-visualization-today",
  "btn-visualization-weekly",
  "btn-visualization-monthly",
  "btn-visualization-annually"
].map(id => document.getElementById(id));

function changeVisualization(type, date = new Date()) {
  generateCalendar(date, type);

  if (type === "daily") {
    btnVisualizationToday.classList.add("active");
    btnVisualizationWeekly.classList.remove("active");
    btnVisualizationMonthly.classList.remove("active");
    btnVisualizationAnnually.classList.remove("active");
  } else if (type === "weekly") {
    btnVisualizationToday.classList.remove("active");
    btnVisualizationWeekly.classList.add("active");
    btnVisualizationMonthly.classList.remove("active");
    btnVisualizationAnnually.classList.remove("active");
  } else if (type === "monthly") {
    btnVisualizationToday.classList.remove("active");
    btnVisualizationWeekly.classList.remove("active");
    btnVisualizationMonthly.classList.add("active");
    btnVisualizationAnnually.classList.remove("active");
  } else if (type === "annually") {
    btnVisualizationToday.classList.remove("active");
    btnVisualizationWeekly.classList.remove("active");
    btnVisualizationMonthly.classList.remove("active");
    btnVisualizationAnnually.classList.add("active");
  }
}

btnVisualizationToday.addEventListener("click", () => changeVisualization("daily"));
btnVisualizationWeekly.addEventListener("click", () => changeVisualization("weekly"));
btnVisualizationMonthly.addEventListener("click", () => changeVisualization("monthly"));
btnVisualizationAnnually.addEventListener("click", () => changeVisualization("annually"));

const styleCalendarVisualization = "daily";
changeVisualization(styleCalendarVisualization, COMPLETE_CURRENT_DATE);