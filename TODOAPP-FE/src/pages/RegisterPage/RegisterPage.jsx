import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { ContentsWrap } from "../TodoPage/TodoPage";
import AppSnackbar from "../../components/AppSnackBar";
import useAppSnackbar from "../../hooks/useAppSnackBar";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // 회원가입 폼 상태 관리
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Snackbar 훅 사용
  const { snack, showSnack, closeSnack } = useAppSnackbar();

  const navigate = useNavigate();

  // 회원가입 처리 함수
  const registerHandler = async (event) => {
    event.preventDefault();
    try {
      // 입력 유효성 검사
      // 필수 입력 확인
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("모든 항목을 입력해주세요.");
      }

      // 비밀번호 일치 여부 확인
      if (password !== confirmPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      // 회원가입 api
      const response = await api.post("/user", { name, email, password });
      // console.log("회원가입", response);

      // 로그인 페이지로 이동
      if (response.status == 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }

      showSnack("회원가입이 완료되어 로그인 페이지로 이동 합니다", "success");
    } catch (error) {
      //   console.error("회원가입 실패:", error);
      showSnack(error?.message || "회원가입에 실패했습니다.", "error");
    }
  };

  return (
    <ContentsWrap>
      <div>
        <Typography variant="h1">회원가입</Typography>

        <form onSubmit={registerHandler}>
          <TextField
            label="Name"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />

          <TextField
            type="email"
            label="Email address"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            type="password"
            label="Password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <TextField
            type="password"
            label="re-enter the password"
            placeholder="re-enter the password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
          />

          <Button variant="contained" type="submit" fullWidth>
            회원가입
          </Button>
        </form>
      </div>

      <AppSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={closeSnack}
      />
    </ContentsWrap>
  );
};

export default RegisterPage;

// 스타일드 컴포넌트
