import React from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { ContentsWrap } from "../TodoPage/TodoPage";

const RegisterPage = () => {
  return (
    <ContentsWrap>
      <div>
        <Typography variant="h1">회원가입</Typography>

        <Stack spacing={2}>
          <TextField label="Name" placeholder="Name" fullWidth />

          <TextField type="email" label="Email address" placeholder="Enter email" fullWidth />

          <TextField type="password" label="Password" placeholder="Password" fullWidth />

          <TextField
            type="password"
            label="re-enter the password"
            placeholder="re-enter the password"
            fullWidth
          />

          <Button variant="contained" fullWidth>
            회원가입
          </Button>
        </Stack>
      </div>
    </ContentsWrap>
  );
};

export default RegisterPage;

// 스타일드 컴포넌트
