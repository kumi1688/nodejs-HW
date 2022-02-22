const express = require("express");
const router = express.Router();

const universities = require("../public/university.json");

router.get("/", (req, res) => {
  res.render("university.html");
});

router.get("/search", (req, res) => {
  console.log(req.query);
  targets = universities.filter(
    (university) => university.name === req.query.name
  );
  res.send(targets[0]);
});

router.post("/", (req, res) => {
  res.send("university post");
});

router.put("/", (req, res) => {
  res.send("university put");
});

router.delete("/", (req, res) => {
  res.send("university delete");
});

module.exports = router;
