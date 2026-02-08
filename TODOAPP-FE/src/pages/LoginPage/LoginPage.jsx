import React from "react";
import { Link } from "react-router-dom";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { ContentsWrap } from "../TodoPage/TodoPage";

const LoginPage = () => {
  return (
    <ContentsWrap>
      <div>
        <Typography variant="h1">로그인</Typography>

        <Stack spacing={2}>
          <TextField type="email" label="Email address" placeholder="Enter email" fullWidth />

          <TextField type="password" label="Password" placeholder="Password" fullWidth />

          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>

          <Typography variant="body1" sx={{ textAlign: "center" }}>
            계정이 없다면?{" "}
            <Typography component={Link} to="/register">
              회원가입 하기
            </Typography>
          </Typography>
        </Stack>
      </div>
    </ContentsWrap>
  );
};

export default LoginPage;

// 스타일드 컴포넌트
