// 따로 분리된 /tasks 라우터 파일

// express 모듈 불러오기
const express = require("express");
const router = express.Router();

// task controller 불러오기
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");

// 할 일 생성 연결
router.post("/", authController.authenticate, taskController.createTask);

// 할 일 조회 연결
router.get("/", taskController.getTask);

// 할 일 업데이트 연결
router.put("/:id", taskController.updateTask);

// 할 일 삭제 연결
router.delete("/:id", taskController.deleteTask);

// 라우터 모듈 내보내기
module.exports = router;
