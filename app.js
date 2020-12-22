const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./models");

class App {
  constructor() {
    this.app = express();

    //db접속
    this.dbConnection();

    //뷰엔진
    this.setViewEngine();

    // 미들웨어
    this.setMiddleWare();

    // 정적 디렉토리
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 에러
    this.status404();

    // 500 에러
    this.status500();
  }

  dbConnection() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection");
      })
      .then(() => {
        console.log("DB Sync");
      })
      .catch((err) => {
        console.error("DB Error", err);
      });
  }

  setMiddleWare() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setViewEngine() {
    nunjucks.configure("template", {
      autoescape: true,
      express: this.app,
    });
  }

  setStatic() {
    this.app.use("/uploads", express.static("uploads"));
  }

  setLocals() {
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404).render("common/404.html");
    });
  }
  status500() {
    this.app.use((err, req, res, _) => {
      res.status(500).render("common/500.html");
    });
  }
}

module.exports = new App().app;
