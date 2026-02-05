import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "./utils/api";

import Typography from "@mui/material/Typography";
import TodoBoard from "./components/TodoBoard";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import useAppSnackbar from "./hooks/useAppSnackBar";
import AppSnackbar from "./components/AppSnackBar";

function App() {
  // 할 일 목록 상태 관리
  const [todoList, setTodoList] = useState([]);
  // 할 일 추가 상태 관리
  const [newTask, setNewTask] = useState("");

  // Snackbar 훅 사용
  const { snack, showSnack, closeSnack, SNACK } = useAppSnackbar();

  // 할 일 목록 불러오는 함수
  const getTodoTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
    console.log("할 일 목록:", response.data.data);
  };

  // 컴포넌트 마운트 시 할 일 목록 불러오기
  useEffect(() => {
    getTodoTasks();
  }, []);

  // 할 일 추가하는 함수
  const addTask = async () => {
    try {
      const response = await api.post("/tasks", { task: newTask });

      if (response.status === 200) {
        console.log("성공");
        // 할 일 목록 갱신
        getTodoTasks();
        // 입력 필드 초기화
        setNewTask("");
        showSnack(SNACK.ADD_SUCCESS);
      } else {
        throw new Error("할 일 추가 실패");
      }
    } catch (err) {
      console.error("할 일 추가 실패:", err);
      showSnack(SNACK.ADD_FAIL, "error");
    }
  };

  // 할 일 완료 처리 하는 함수
  const completeTask = async (id) => {
    try {
      const taskdata = todoList.find((task) => task._id === id);

      // 존재하지 않는 할 일 처리
      if (!taskdata) {
        throw new Error("할 일 데이터를 찾을 수 없습니다.");
      }
      const response = await api.put(`/tasks/${id}`, { isCompleted: !taskdata.isCompleted });

      if (response.status === 200) {
        // 할 일 목록 갱신
        getTodoTasks();
        showSnack(SNACK.COMPLETE_SUCCESS);
      } else {
        throw new Error("할 일 완료 실패");
      }
    } catch (err) {
      console.error("할 일 완료 실패:", err);
      showSnack(SNACK.COMPLETE_FAIL, "error");
    }
  };

  // 할 일 삭제하는 함수
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);

      if (response.status === 200) {
        // 할 일 목록 갱신
        getTodoTasks();
        showSnack(SNACK.DELETE_SUCCESS);
      } else {
        throw new Error("할 일 삭제 실패");
      }
    } catch (err) {
      console.error("할 일 삭제 실패:", err);
      showSnack(SNACK.DELETE_FAIL, "error");
    }
  };

  return (
    <ContentsWrap>
      <Inner>
        <MainTitle variant="h1" fontWeight={700}>
          TODO LIST
        </MainTitle>

        <TextWrap>
          <TextField
            aria-label="Search"
            label="할 일 입력"
            variant="outlined"
            placeholder="할 일을 입력해주세요"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="primary" onClick={addTask}>
            추가
          </Button>
        </TextWrap>

        <TodoBoard
          todoList={todoList}
          showSnack={showSnack}
          SNACK={SNACK}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      </Inner>

      <AppSnackbar
        key={snack.key}
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={closeSnack}
      />
    </ContentsWrap>
  );
}

export default App;

// 스타일드 컴포넌트
const ContentsWrap = styled("div")(() => ({
  height: "100vh",
  maxWidth: "720px",
  margin: "0 auto",
  boxSizing: "border-box",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Inner = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: theme.palette.background.paper,
  height: "90%",
  borderRadius: "15px",
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: "20px 0 40px 0",
  textAlign: "center",
}));

const TextWrap = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: "40px",

  "& Button": {
    width: "100px",
    marginLeft: "10px",
    boxShadow: "none",
    border: "1px solid transparent",
    transition: "all 0.3s ease",

    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      boxShadow: "none",
    },
  },
}));
