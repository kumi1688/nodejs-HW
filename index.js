// 설치된 express 모듈 불러오기
const express = require("express");

// express 모듈 실행
// express 모듈이 실행되면 하나의 객체를 반환하는데, 반환된 객체를 보통 app이라고 부름
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ok");
});

// 서버에 사용할 port 번호는 3000
const port = 3000;

//서버 가동
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
