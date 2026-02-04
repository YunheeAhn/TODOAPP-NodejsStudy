// 라우터 정의

// 1. 할 일을 입력하면 추가 할 수 있다. /tasks post
// 2. 입력한 할 일 리스트가 화면에 보여진다. /tasks get
// 3. 할 일을 끝났는지 안 끝났는지 여부에 따라 ui가 달라진다. /tasks/:id put
// 4. 할 일을 삭제 할 수 있다. /tasks/:id delete

// express 모듈 불러오기
const express = require("express");
const router = express.Router();

// task api 라우터 불러오기
const taskApiRouter = require("./task.api");

// /tasks 경로로 들어오는 요청은 taskApiRouter로 라우팅
router.use("/tasks", taskApiRouter);
module.exports = router;
