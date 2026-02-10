import "./App.css";

import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import { useState } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import api from "./utils/api";
import { useEffect } from "react";

function App() {
  // 페이지 라우터 설정

  // user로그인 여부에 따른 Private Route
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // 토큰을 통해 유저 정보 가져오기
    try {
      // 세션 스토리지에 저장 된 토큰 가져오기
      const storedToken = sessionStorage.getItem("token");

      if (storedToken) {
        // 만약 토큰이 있다면? = 유저는 로그인을 했음
        const response = await api.get("/user/me");

        // 유저 정보 가져오기
        setUser(response.data.user);
      }
    } catch (error) {
      // 토큰을 통해 유저 정보 가져오는 것 실패
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
