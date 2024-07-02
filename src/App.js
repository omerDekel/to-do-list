import { Box, Button, List, ListItem, Typography } from "@mui/material";
import classes from "./App.module.css";
import TaskItem from "./components/TaskItem/TaskItem";
import { useEffect, useState } from "react";
import { CONSTANTS } from "./constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "./managers/redux/reducers/TasksReducer";
import TaskModal from "./components/Modals/TaskModal/TaskModal";
import AddIcon from "@mui/icons-material/Add";

const App = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [todos, setTodos] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const deleteTodo = (id) => {
    dispatch(deleteTask(id));
  };

  const onClickTask = (task) => {
    console.log(task);
    setSelectedTask(task);
    setOpenEditModal(true);
  }

  const toggleTodoCompletion = (id) => {
    setTodos(
      todos?.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
        <Button onClick={() => dispatch(fetchTasks())}>Retry</Button>
      </Box>
    );
  }
  return (
    <Box className={classes.ToDoListScreenContainer}>
      <TaskModal task={selectedTask} titleText={CONSTANTS.STRINGS.EDIT_HEADER} open={openEditModal} onClose={() => setOpenEditModal(false)}></TaskModal>
      <TaskModal titleText={CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL} open={openAddModal} onClose={() => setOpenAddModal(false)}></TaskModal>
      <Box className={classes.AppHeader}>
        <Typography variant="h1" component="h2" fontFamily="cursive">
          {CONSTANTS.STRINGS.MAIN_HEADER}
        </Typography>
      </Box>
      <Box className={classes.AddNewToDoInput}>
        <Button
          variant={"outlined"}
          onClick={() => setOpenAddModal(true)}
          startIcon={<AddIcon />}
        >
          {CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL}
        </Button>
      </Box>
      <Box className={classes.ToDoList}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {tasks?.map((curTask, i) => (
            <ListItem key={i}>
              <TaskItem
                task={curTask}
                onClickTask={() => onClickTask(curTask)}
                deleteTodo={deleteTodo}
                toggleTodoCompletion={toggleTodoCompletion}
              ></TaskItem>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default App;
