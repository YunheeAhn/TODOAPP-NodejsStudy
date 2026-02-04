// /task 관련된 데이터베이스 스키마 정의
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true, // 할 일 내용은 필수
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false, // true면 완료, false면 미완료
    },
  },
  // 생성 및 수정 시간 자동 기록
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
