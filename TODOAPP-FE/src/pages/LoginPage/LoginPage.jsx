import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { ContentsWrap } from "../TodoPage/TodoPage";

import AppSnackbar from "../../components/AppSnackBar";
import useAppSnackbar from "../../hooks/useAppSnackBar";
import api from "../../utils/api";

const LoginPage = () => {
  // Snackbar 훅 사용
  const { snack, showSnack, closeSnack } = useAppSnackbar();

  // 로그인 이메일, 패스워드 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 유저 정보 상태 관리
  const [user, setUser] = useState("");

  // 네비게이션
  const navigate = useNavigate();

  // 로그인 처리 함수
  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      console.log("로그인", response);

      if (response.status === 200) {
        showSnack("로그인에 성공 했습니다", "success");

        // 세션 스토리지에 저장
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);

        // 토큰 값 헤더 api에 보내주기
        api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;

        // 투두페이지로 이동
        navigate("/");
      }
      throw new Error("로그인에 실패했습니다.");
    } catch (error) {
      const serverMsg = error?.response?.data?.message;
      showSnack(serverMsg || error?.message || "로그인에 실패했습니다.", "error");
    }
  };

  return (
    <ContentsWrap>
      <div>
        <Typography variant="h1">로그인</Typography>

        <form onSubmit={loginHandler}>
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

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>

          <Typography variant="body1" sx={{ textAlign: "center" }}>
            계정이 없다면?
            <Typography component={Link} to="/register">
              회원가입 하기
            </Typography>
          </Typography>
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

export default LoginPage;

// 스타일드 컴포넌트
