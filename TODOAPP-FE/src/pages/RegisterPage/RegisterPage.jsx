import React, { useState } from "react";
import { Typography, TextField, Button, styled } from "@mui/material";
import { ContentsWrap, MainTitle } from "../TodoPage/TodoPage";
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
      <Inner>
        <MainTitle variant="h1" fontWeight={700}>
          회원가입
        </MainTitle>

        <FormContainer onSubmit={registerHandler}>
          <TextField
            label="이름"
            placeholder="이름을 입력해주세요"
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />

          <TextField
            type="email"
            label="이메일"
            placeholder="이메일 주소를 입력해주세요"
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <TextField
            type="password"
            label="비밀번호 재입력"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
          />

          <ButtonWrap>
            <Button variant="contained" type="submit" fullWidth>
              회원가입하기
            </Button>
          </ButtonWrap>
        </FormContainer>
      </Inner>

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

export const Inner = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: theme.palette.background.paper,
  // height: "90%",
  borderRadius: "15px",
}));

export const FormContainer = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}));

export const ButtonWrap = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  flexDirection: "column",
  marginTop: "20px",

  "& button": {
    transition: "all .3s ease",
    boxShadow: "none",
    border: "1px solid transparent",

    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      border: "1px solid" + theme.palette.primary.main,
      boxShadow: "none",
    },
  },
}));
