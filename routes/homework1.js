const express = require("express");
const router = express.Router();

const titanic = require("../public/titanic.json");

router.get("/", (req, res) => {
  res.render("homework1.html");
});

router.get("/search", (req, res) => {
  // 1. titanic.json에서 승객들의 데이터만 고르기
  let passengers = titanic;

  console.log(req.query);
  // 2. 클라이언트에 보내온 Query에서 Key값만 골라내기
  const keys = Object.keys(req.query);

  // 3. 클라이언트가 보내온 Key의 값과 titanic.json에 있는 승객 데이터 중에서 조회하고자 하는 것이 있나 확인
  let filtered = passengers;
  for (key of keys) {
    if (req.query[key] === "" || req.query[key] === "Choose...") continue;
    filtered = filtered.filter((passenger) => passenger[key] == req.query[key]);
  }
  passengers = filtered;

  // 4. 필터링 된 데이터 전달하기
  res.send(passengers);
});

module.exports = router;
