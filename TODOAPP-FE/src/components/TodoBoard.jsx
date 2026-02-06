import React from "react";
import TodoItem from "./TodoItem";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

const TodoBoard = ({ todoList = [], showSnack, SNACK, completeTask, deleteTask }) => {
  return (
    <BoardWrap>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            completeTask={completeTask}
            showSnack={showSnack}
            SNACK={SNACK}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <Typography variant="subtitle1" fontWeight={500}>
          아직 등록 된 할 일이 없습니다.
        </Typography>
      )}
    </BoardWrap>
  );
};

export default TodoBoard;

const BoardWrap = styled("div")(() => ({
  overflowY: "scroll",
  height: "60vh",
}));
