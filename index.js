// 설치된 express 모듈 불러오기
const express = require("express");

// express 모듈 실행
// express 모듈이 실행되면 하나의 객체를 반환하는데, 반환된 객체를 보통 app이라고 부름
const app = express();

// Express 모듈의 미들웨어 설정하기
app.use(express.static("public")); // public 폴더 안에 있는 정적 파일들을 URL만으로 전달할 수 있는 미들웨어 적용
app.use(express.json()); // 클라이언트의 request가 json 타입으로 오는 경우 parsing 해주는 미들웨어 적용
app.use(express.urlencoded({ extended: true })); // 클라이언트의 request가 URL(Query)로 오는 경우 parsing 해주는 미들웨어 적용

// http://localhost:3000/ 으로 접속하는 요청에 대한 응답 설정
app.get("/", (req, res) => {
  res.send("ok");
});

// 서버에 사용할 port 번호는 3000
const port = 3000;

//서버 가동
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
