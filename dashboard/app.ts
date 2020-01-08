import cookieParser = require("cookie-parser");
import express = require("express");
import http = require("http");
import createError = require("http-errors");
import logger = require("morgan");
import path = require("path");
import dashboard from "./src/routes/dashboard";
import index from "./src/routes";
import {normalizePort, onError} from "./src/util/util";
import {NextFunction, Request, Response} from "express";
import cors from "cors";

function createApp() {
  const app = express();
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  index(app, express);
  dashboard(app, express);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.env.PORT || "3001");
  app.set("port", port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);

  /**
   * Normalize a port into a number, string, or false.
   */
}

createApp();
