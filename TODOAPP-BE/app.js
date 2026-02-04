//*** 백엔드 기본 세팅 ***//

//*** express 세팅 ***//
const express = require("express");

//*** mongoose 세팅 ***//
const mongoose = require("mongoose");

//*** body-parser 세팅 ***//
const bodyParser = require("body-parser");

//*** 라우터 불러오기 ***//
const indexRouter = require("./routes/index");

//*** express 앱 생성 ***//
const app = express();

//*** body-parser 미들웨어 설정 ***//
app.use(bodyParser.json());

//*** 라우터 설정 ***//
app.use("/api", indexRouter); // /api/tasks 로 라우팅됨

//*** mongoose 연결 ***//
const mongoURI = "mongodb://localhost:27017/TodoApp";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("mongoose connection error:", err);
  });

//*** app listener 설정 ***//
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
