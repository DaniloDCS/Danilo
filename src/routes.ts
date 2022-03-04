import { Router, Request, Response } from "express";
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  return res.render("pages/home", {
    title: "Home",
  });
});

route.get("/weather", async (req: Request, res: Response) => {
  return res.render("pages/weather", {
    title: "Weather",
  });
});

route.get("/calendar", async (req: Request, res: Response) => {
  return res.render("pages/calendar", {
    title: "Calendar",
  });
});

route.get("/clock", async (req: Request, res: Response) => {
  return res.render("pages/clock", {
    title: "Clock",
  });
});

route.get("/countdown", async (req: Request, res: Response) => {
  return res.render("pages/countdown", {
    title: "Countdown",
  });
});

route.get("/pomodoro", async (req: Request, res: Response) => {
  return res.render("pages/pomodoro", {
    title: "Pomodoro",
  });
});

route.get("/reminder", async (req: Request, res: Response) => {
  return res.render("pages/reminder", {
    title: "Reminder",
  });
});

route.get("/timer", async (req: Request, res: Response) => {
  return res.render("pages/timer", {
    title: "Timer",
  });
});

route.get("/todo", async (req: Request, res: Response) => {
  return res.render("pages/todo", {
    title: "Todo",
  });
});

route.get("/notes", async (req: Request, res: Response) => {
  return res.render("pages/notes", {
    title: "Notes",
  });
});

route.get("/chat", async (req: Request, res: Response) => {
  return res.render("pages/chat", {
    title: "Chat",
  });
});

route.get("/code", async (req: Request, res: Response) => {
  return res.render("pages/code", {
    title: "Code",
  });
});

route.get("/colorful", async (req: Request, res: Response) => {
  return res.render("pages/colorful", {
    title: "Colorful",
  });
});

route.get("/painting", async (req: Request, res: Response) => {
  return res.render("pages/painting", {
    title: "Painting",
  });
});

route.get("/restapi", async (req: Request, res: Response) => {
  return res.render("pages/restApi", {
    title: "REST API",
  });
});

route.get("/borderradiuspreviewer", async (req: Request, res: Response) => {
  return res.render("pages/borderRadiusPreviewer", {
    title: "Border Radius Previewer",
  });
});

route.get("/markdownpreviewer", async (req: Request, res: Response) => {
  return res.render("pages/markdownPreviewer", {
    title: "Markdown Previewer",
  });
});

route.get("/calculator", async (req: Request, res: Response) => {
  return res.render("pages/calculator", {
    title: "Calculator",
  });
});

route.get("/calculatethearea", async (req: Request, res: Response) => {
  return res.render("pages/calculateTheArea", {
    title: "Calculate the area",
  });
});

route.get("/calculatethevolume", async (req: Request, res: Response) => {
  return res.render("pages/calculateTheVolume", {
    title: "Calculate the volume",
  });
});

route.get("/temperatureconverter", async (req: Request, res: Response) => {
  return res.render("pages/temperatureConverter", {
    title: "Temperature converter",
  });
});

route.get("/convertcurrency", async (req: Request, res: Response) => {
  return res.render("pages/convertCurrency", {
    title: "Convert currency",
  });
});

route.get("/numberbaseconvert", async (req: Request, res: Response) => {
  return res.render("pages/numberBaseConvert", {
    title: "Number Base Convert",
  });
});

route.get("/quiz", async (req: Request, res: Response) => {
  return res.render("pages/quiz", {
    title: "Quiz",
  });
});

route.get("/randomnumbers", async (req: Request, res: Response) => {
  return res.render("pages/randomNumbers", {
    title: "Random Numbers",
  });
});

route.get("/writing", async (req: Request, res: Response) => {
  return res.render("pages/writing", {
    title: "Writing",
  });
});

route.get("/findmymovie", async (req: Request, res: Response) => {
  return res.render("pages/findMyMovie", {
    title: "Find My Movie",
  });
});

route.get("/findmysong", async (req: Request, res: Response) => {
  return res.render("pages/findMySong", {
    title: "Find My Song",
  });
});

route.get("/findmybook", async (req: Request, res: Response) => {
  return res.render("pages/findMyBook", {
    title: "Find My Book",
  });
});

route.get("/tic-tac-toe", async (req: Request, res: Response) => {
  return res.render("pages/tic-tac-toe", {
    title: "Tic-Tac-Toe",
  });
});

route.get("/snake", async (req: Request, res: Response) => {
  return res.render("pages/snake", {
    title: "Snake",
  });
});

route.get("/pong", async (req: Request, res: Response) => {
  return res.render("pages/pong", {
    title: "Pong",
  });
});

route.get("/hangman", async (req: Request, res: Response) => {
  return res.render("pages/hangman", {
    title: "Hangman",
  });
});

route.get("/keyboard", async (req: Request, res: Response) => {
  return res.render("pages/keyboard", {
    title: "Keyboard",
  });
});

route.get("/cropimages", async (req: Request, res: Response) => {
  return res.render("pages/cropImages", {
    title: "Crop Images",
  });
});

export default route;