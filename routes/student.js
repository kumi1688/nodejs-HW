const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const sample = require("../public/sample.json");

router.get("/", (req, res) => {
  res.render("student.html");
});

router.get("/search", (req, res) => {
  console.log(req.query);
  let students = sample.students;
  const keys = Object.keys(req.query);
  for (key of keys) {
    let filtered = students.filter((student) => student[key] == req.query[key]);
    if (filtered.length != 0) students = filtered;
  }
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
