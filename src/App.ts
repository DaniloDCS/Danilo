import express from "express";
import cors from "cors";
import layouts from "express-ejs-layouts";
import routes from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(layouts);
    this.express.set("view engine", "ejs");
  }

  private routes(): void {
    this.express.use("/public/", express.static("public/"));
    this.express.use("/fontawesome/", express.static("node_modules/@fortawesome/fontawesome-free/"));
    this.express.use("/", routes);

    this.express.use((req: express.Request, res: express.Response) => {
      res.status(404).render("pages/404", {
        title: "PAGE NOT FOUND",
      });
    });
  }
}

export default new App().express;