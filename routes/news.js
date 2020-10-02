const express = require("express");
const router = express.Router();
const newsModel = require("../models/news");

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search || "";

  const findNews = newsModel
    .find({ title: new RegExp(search.trim(), "i") })
    .sort({ createdDate: -1 });

  findNews.exec((err, news) => {
    res.render("news", { title: "News", news, search });
  });
});

module.exports = router;
