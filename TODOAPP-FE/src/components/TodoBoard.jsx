import React from "react";
import TodoItem from "./TodoItem";
import Typography from "@mui/material/Typography";

const TodoBoard = ({ todoList = [], showSnack, SNACK, completeTask, deleteTask }) => {
  return (
    <div>
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
    </div>
  );
};

export default TodoBoard;
