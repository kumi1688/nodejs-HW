const express = require("express");
const router = express.Router();

const fruits = require("../public/fruits.json");

router.get("/", (req, res) => {
  res.render("homework2.html");
});

router.get("/search", (req, res) => {
  console.log(req.query);
  filtered = fruits.filter((fruit) =>
    fruit["MAIN_TRTMNT_PRODLST_NM"].split("+").includes(req.query.fruit)
  );
  res.send(filtered);
});

module.exports = router;
