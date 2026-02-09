// user 권한 기능 정의

// jsonwebtoken 모듈 불러오기
const jwt = require("jsonwebtoken");

// env 파일 불러오기
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// http 응답 규칙
// 200 : 성공
// 400 : 클라이언트 요청 오류
// 500 : 서버 내부 오류

// authController 객체 생성
const authController = {};

// 유저권한 확인 생성
authController.authenticate = (req, res, next) => {
  try {
    // user의 토큰 값 가져오기
    const tokenString = req.headers.authorization;

    // 토큰 값 유무 판단하기
    if (!tokenString) {
      // 토큰 값이 없는 경우 -> 에러 발생
      throw new Error("유효하지 않은 토큰 입니다");
    }

    // 토큰 값이 있는 경우
    const token = tokenString.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("만료되거나 유효하지 않은 토큰 입니다");
      }
      // console.log("payload??", payload); // user id
      //   res.status(200).json({ status: "success", userId: payload._id });

      // -> user.api.js 에서 다음 내용 지정
      req.userId = payload._id;
    });
    // 완료 후 할 내용을 next()로 보내줌
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = authController;
