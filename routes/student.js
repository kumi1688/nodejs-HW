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
  let filtered = students;
  for (key of keys) {
    if (req.query[key] === "") continue;
    filtered = filtered.filter((student) => student[key] == req.query[key]);
  }
  students = filtered;

  // 4. 필터링 된 데이터 전달하기
  res.send(students);
});

router.post("/", (req, res) => {
  // 1. sample.json에서 학생 데이터만 고르기
  let students = sample.students;

  // 2. 클라이언트가 보내온 데이터를 새로운 학생 데이터로 그대로 옮기기
  let newStudent = req.body;

  // 3. 새로운 학생의 id는 마지막 학생 id + 1
  newStudent["id"] = students.length + 1;

  // 4. 새로운 학생을 기존의 학생 데이터에 추가
  students.push(newStudent);

  // 5. sample 객체에 새로운 학생 데이터로 덮어쓰기
  sample.students = students;

  // 6. sample 객체에 쓰일 데이터 경로 명시
  filePath = path.join(__dirname, "../public/sample.json");

  // 7. 기존의 sample.json을 업데이트된 sample 객체로 덮어쓰기
  fs.writeFile(filePath, JSON.stringify(sample), {}, (err) => {
    if (err) console.log(err);
  });

  // 8. 업데이트 된 학생 데이터를 클라이언트에게 보내기
  res.send(students);
});

router.put("/", (req, res) => {
  res.send("student, put");
});

router.delete("/", (req, res) => {
  res.send("student delete");
});

module.exports = router;
