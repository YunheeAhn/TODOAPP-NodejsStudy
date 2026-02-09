//따로 분리 된 /user 라우터 파일

// express 모듈 불러오기
const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// user controller 불러오기

// 회원가입 endpoint 연결
router.post("/", userController.createUser);

// 로그인 endpoint 연결
router.post("/login", userController.loginWithEmail);

// 로그인 유저 토큰 endpoint 연결
router.get("/me", authController.authenticate, userController.getUser);

// 라우터 모듈 내보내기
module.exports = router;
