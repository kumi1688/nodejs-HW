const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const sample = require("../public/sample.json");

router.get("/", (req, res) => {
  res.render("student.html");
});

router.get("/search", (req, res) => {
  // 1. sample.json에서 학생들의 데이터만 고르기
  let students = sample.students;

  // 2. 클라이언트에 보내온 Query에서 Key값만 골라내기
  const keys = Object.keys(req.query);

  // 3. 클라이언트가 보내온 Key의 값과 sample.json에 있는 학생 데이터 중에서 조회하고자 하는 것이 있나 확인
  for (key of keys) {
    let filtered = students.filter((student) => student[key] == req.query[key]); // 있으면 필터링하고
    if (filtered.length != 0) students = filtered; // 없다면 그냥 빈 배열 전달
  }

  // 4. 필터링 된 데이터 전달하기
  res.send(students);
});

router.post("/", (req, res) => {
  let students = sample.students;
  console.log(req.body);
  const keys = Object.keys(req.body);
  let newStudent = {};
  newStudent["id"] = students.length + 1;

  for (key of keys) {
    newStudent[key] = req.body[key];
  }
  students.push(newStudent);

  sample.students = students;

  filePath = path.join(__dirname, "../public/sample.json");
  fs.writeFile(filePath, JSON.stringify(sample), {}, (err) => {
    if (err) console.log(err);
  });
  res.send(students);
});

router.put("/", (req, res) => {
  res.send("student, put");
});

router.delete("/", (req, res) => {
  res.send("student delete");
});

module.exports = router;
