const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const config = require("./config.js");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const indexNews = require("./routes/news");
const indexQuiz = require("./routes/quiz");
const indexAdmin = require("./routes/admin");

const { localPath } = require("./middleware/middleware");

try {
  mongoose.connect(
    config.db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(localPath);

app.use("/", indexRouter);
app.use("/news", indexNews);
app.use("/quiz", indexQuiz);
app.use("/admin", indexAdmin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
