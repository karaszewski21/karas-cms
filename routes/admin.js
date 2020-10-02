const express = require("express");
const newsModel = require("../models/news");
const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }

  next();
});

/* GET home page. */
router.get("/", (req, res) => {
  newsModel.find((err, news) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("admin/index", { title: "Admin", news });
  });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Dodaj news", errors: {}, body: {} });
});

router.get("/news/remove/:id", (req, res) => {
  newsModel.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/admin");
  });
});

router.post("/news/add", (req, res) => {
  const body = req.body;

  const news = new newsModel(body);
  const errors = news.validateSync();

  news.save((err) => {
    if (err) {
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
      return;
    }
    res.redirect("/admin");
  });
});

module.exports = router;
