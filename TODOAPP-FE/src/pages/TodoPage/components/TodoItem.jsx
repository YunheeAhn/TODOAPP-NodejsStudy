import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TodoItem = ({ todo, completeTask, deleteTask }) => {
  return (
    <ItemWrap isCompleted={todo.isCompleted}>
      <TaskText isCompleted={todo.isCompleted} variant="body1" fontWeight={400}>
        {todo.task}
      </TaskText>
      <ButtonWrap>
        <Button variant="outlined" onClick={() => deleteTask(todo._id)}>
          삭제
        </Button>
        <Button variant="outlined" onClick={() => completeTask(todo._id)}>
          {todo.isCompleted ? "완료됨" : "완료"}
        </Button>
      </ButtonWrap>
    </ItemWrap>
  );
};

export default TodoItem;

const ItemWrap = styled("div", {
  shouldForwardProp: (prop) => prop !== "isCompleted",
})(({ theme, isCompleted }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  borderRadius: "10px",
  transition: "all .3s ease",
  borderLeft: " 2px solid transparent",
  "& + div": {
    marginTop: "10px",
  },

  "&:hover": {
    borderLeft: "2px solid " + theme.palette.primary.main,
  },

  // 할 일 완료 시 스타일 변경
  ...(isCompleted && {
    backgroundColor: theme.palette.action.disabledBackground,
  }),
}));

const TaskText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isCompleted",
})(({ theme, isCompleted }) => ({
  textDecoration: isCompleted ? "line-through" : "none",
  color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
}));

const ButtonWrap = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",

  "& button": {
    transition: "all .3s ease",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: "none",
    },
  },
}));
