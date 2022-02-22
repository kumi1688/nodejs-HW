const express = require("express");
const router = express.Router();

const fs = require("fs");

const sample = require("../public/sample.json");

router.get("/", (req, res) => {
  res.render("teachers.html");
});

router.get("/search", (req, res) => {
  // 1. sample.json에서 선생님들의 데이터만 고르기
  let teachers = sample.teachers;

  // 2. 클라이언트에 보내온 Query에서 Key값만 골라내기
  const keys = Object.keys(req.query);

  // 3. 클라이언트가 보내온 Key의 값과 sample.json에 있는 선생님의 데이터 중에서 조회하고자 하는 것이 있나 확인
  for (key of keys) {
    let filtered = teachers.filter((teacher) => teacher[key] == req.query[key]); // 있으면 필터링하고
    if (filtered.length != 0) teachers = filtered; // 없다면
  }

  // 4. 필터링 된 데이터 전달하기
  res.send(teachers);
});

router.post("/", (req, res) => {
  // 1. sample.json에서 선생님들의 데이터만 고르기
  let teachers = sample.teachers;

  // 2. 클라이언트가 보내온 데이터를 새로운 선생님 데이터로 그대로 옮기기
  let newTeacher = req.body;

  // 3. 새로운 선생님의 id는 마지막 선생님 id + 1
  newTeacher["id"] = teachers.length + 1;

  teachers.push(newTeacher);

  sample.teachers = teachers;
  filePath = path.join(__dirname, "../public/sample.json");
  fs.writeFile(filePath, JSON.stringify(sample), {}, (err) => {
    if (err) console.log(err);
  });
  res.send(teachers);
});

router.put("/", (req, res) => {
  res.send("teacher put");
});

router.delete("/", (req, res) => {
  res.send("teacher delete");
});

module.exports = router;
