// task 기능 정의

// model 불러오기
const Task = require("../model/Task");

// taskController 객체 생성
const taskController = {};

// http 응답 규칙
// 200 : 성공
// 400 : 클라이언트 요청 오류
// 500 : 서버 내부 오류

// 할 일 생성(추가)
taskController.createTask = async (req, res) => {
  try {
    // 할 일 추가 로직

    // 요청 바디에서 할 일 내용과 완료 여부 추출
    const { task, isCompleted } = req.body;
    // auth.controller.js 에서 보낸 유저 id 미들웨어로 연결
    const { userId } = req;
    // 새로운 할 일 인스턴스 생성
    const newTask = new Task({ task, isCompleted, author: userId });
    // 데이터베이스에 저장
    await newTask.save();

    // 성공 응답 반환
    res
      .status(200)
      .json({ status: "success", data: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

// 할 일 조회
taskController.getTask = async (req, res) => {
  try {
    // 할 일 조회 로직
    const taskList = await Task.find({}).populate("author").select("-__v"); // __v 필드 제외

    // 성공 응답 반환
    res
      .status(200)
      .json({ status: "success", data: taskList, message: "Task list retrieved successfully" });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

// 할 일 업데이트
taskController.updateTask = async (req, res) => {
  try {
    // 할 일 업데이트 로직
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(400).json({ status: "Failed", message: "Task not found" });
    }

    res
      .status(200)
      .json({ status: "success", data: updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

// 할 일 삭제
taskController.deleteTask = async (req, res) => {
  try {
    // 할 일 삭제 로직
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "success", data: deletedTask, message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

module.exports = taskController;
