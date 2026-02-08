// user 기능 정의

// model 불러오기
const User = require("../model/User");

// bcryptjs 모듈 불러오기 (비밀번호 암호화)
const bcrypt = require("bcryptjs");

// http 응답 규칙
// 200 : 성공
// 400 : 클라이언트 요청 오류
// 500 : 서버 내부 오류

// userController 객체 생성
const userController = {};

// 회원가입 유저 생성
userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // 이미 존재하는 이메일인지 확인
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new Error("이미 가입한 이메일 입니다");
    }

    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // console.log("암호화된 비밀번호:", hash);

    // 새로운 유저 생성
    const newUser = new User({
      name,
      email,
      password: hash, // 암호화된 비밀번호 저장
    });

    // 데이터베이스에 유저 저장
    await newUser.save();

    // 성공 응답
    res.status(200).json({ status: "success", message: "회원가입에 성공 했습니다" });
  } catch (error) {
    // 에러 응답
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

// 로그인 처리
userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 유저 정보 가져오기
    const user = await User.findOne({ email: email }, "-createdAt -updatedAt -__v");

    if (user) {
      // 비밀번호 검증(해시처리된 비밀번호 비교)
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        // 비밀번호가 일치하면 토큰 발행
        const token = user.generateAuthToken();

        // 성공 응답
        res.status(200).json({ status: "success", user, token, message: "로그인에 성공 했습니다" });
      } else {
        throw new Error("잘못된 비밀번호 입니다.");
      }
    }
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다");
  } catch (error) {
    // 에러 응답
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

module.exports = userController;
