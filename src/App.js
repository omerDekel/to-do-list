import { Box, List, ListItem, Typography } from "@mui/material";
import classes from "./App.module.css";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import { useEffect, useState } from "react";
import AddNewToDoInput from "./components/AddNewToDoInput/AddNewToDoInput";
import { CONSTANTS } from "./constants/Constants";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const interval = setInterval(() => {
      console.log('hi!');
    },10000);
    return () =>{ clearInterval(interval);
      console.log('stop!');
    }
    ;
  }, [todos]);

  const addTodo = (todoText) => {
    const newTodo = {
      id: todos?.length + 1,
      text: todoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId) => {
    let newToDos = todos.filter((td) => td.id !== todoId);
    //Resetting the IDs following deletion
    for (let i = 0; i < newToDos.length; i++) {
      newToDos[i].id = i;
    }
    setTodos(newToDos);
  };

  const toggleTodoCompletion = (id) => {
    setTodos(
      todos?.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Box className={classes.ToDoListScreenContainer}>
      <Box className={classes.AppHeader}>
        <Typography variant="h1" component="h2" fontFamily="cursive">
          {CONSTANTS.STRINGS.MAIN_HEADER}
        </Typography>
      </Box>
      <Box className={classes.AddNewToDoInput}>
        <AddNewToDoInput
          label={CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL}
          textFieldLabel={CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL}
          addTodo={addTodo}
        />
      </Box>
      <Box className={classes.ToDoList}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {todos?.map((toDo, i) => (
            <ListItem key={i}>
              <ToDoItem
                todo={toDo}
                deleteTodo={deleteTodo}
                toggleTodoCompletion={toggleTodoCompletion}
              ></ToDoItem>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default App;