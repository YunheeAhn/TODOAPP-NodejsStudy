// 라우터 정의

// TODO APP 요구사항
// 1. 할 일을 입력하면 추가 할 수 있다. /tasks post
// 2. 입력한 할 일 리스트가 화면에 보여진다. /tasks get
// 3. 할 일을 끝났는지 안 끝났는지 여부에 따라 ui가 달라진다. /tasks/:id put
// 4. 할 일을 삭제 할 수 있다. /tasks/:id delete

// 회원가입 요구사항
// 1. 유저는 이메일과 비밀번호를 입력하여 회원가입을 할 수 있다. /user post
// 2. 유저의 패스워드는 암호화 되어 데이터베이스에 저장된다.

// 로그인 요구사항
// 1. 유저는 이메일과 비밀번호를 입력하여 로그인을 할 수 있다. /user/login post
// - 이메일 정보를 갖고 있는 유저가 데이터베이스에 있는지 확인
// 2. 만약 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있다면? 로그인 성공 -> 유저정보 + 토큰 발행
// 3. 없다면? 로그인 실패, 에러메세지
// 4. 응답으로 유저정보와 토큰을 반환한다.

// express 모듈 불러오기
const express = require("express");
const router = express.Router();

//*** api 라우터 불러오기 ***//
// task api 라우터 불러오기(할일)
const taskApiRouter = require("./task.api");
// user api 라우터 불러오기(회원가입)
const userApi = require("./user.api");

//*** 라우터 설정 ***//
// /tasks 경로로 들어오는 요청은 taskApiRouter로 라우팅
router.use("/tasks", taskApiRouter);
// /user 경로로 들어오는 요청은 userApi로 라우팅
router.use("/user", userApi);

module.exports = router;
