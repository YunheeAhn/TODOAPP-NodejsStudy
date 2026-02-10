// /user 관련된 데이터베이스 스키마 정의
const mongoose = require("mongoose");

// jsonwebtoken 모듈 불러오기
const jwt = require("jsonwebtoken");

// env 파일 불러오기
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // 생성 및 수정 시간 자동 기록
  { timestamps: true },
);

// 민감한 정보 제거 메서드(ex: password)
userSchema.methods.toJSON = function () {
  // user 객체를 JSON으로 변환할 때 민감한 정보 제거
  const userObject = this.toObject();
  delete userObject.password; // 비밀번호 정보 제거
  delete userObject.updatedAt;
  delete userObject.createdAt;
  delete userObject.__v;
  return userObject;
};

// 인증 토큰 생성 메서드
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
