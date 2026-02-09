import "./App.css";

import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import { useState } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import api from "./utils/api";

function App() {
  // 페이지 라우터 설정

  // user로그인 여부에 따른 Private Route
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = api.get("");
    } catch (error) {}
  };

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

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
