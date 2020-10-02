const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */

router.get("/", (req, res) => {
  const show = !req.session.quiz;
  Quiz.find((err, data) => {
    sumVote = data.reduce((acc, data) => {
      return (acc += data.vote);
    });

    res.render("quiz", { title: "Quiz", data, show, sumVote });
  });
});

router.post("/", (req, res) => {
  const quizId = req.body.quiz;

  Quiz.findOne({ _id: quizId }, (err, data) => {
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.quiz = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;
