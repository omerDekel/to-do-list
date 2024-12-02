import { Box, Button, Typography } from "@mui/material";
import classes from "./App.module.css";
import { useEffect, useState } from "react";
import { CONSTANTS } from "./constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "./components/Modals/TaskModal/TaskModal";
import AddIcon from "@mui/icons-material/Add";
import { TASK_MODAL_FORMS } from "./enums/ClientEnums";
import { fetchTasks } from "./managers/redux/slices/tasksSlice";
import { TaskEntity } from "./entities/TaskEntity";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTask) {
      const index = tasks.findIndex((task) => task.id === selectedTask.id);
      if (index !== -1) {
        setSelectedTask(tasks[index]);
      }
    }
  }, [selectedTask, tasks]);

  const onClickTask = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  if (loading) {
    return <Typography>{CONSTANTS.STRINGS.LOADING_TITLE}</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Typography>
          {CONSTANTS.STRINGS.ERROR_TITLE}: {error}
        </Typography>
        <Button onClick={() => dispatch(fetchTasks())}>{CONSTANTS.STRINGS.RETRY_TITLE}</Button>
      </Box>
    );
  }
  return (
    <Box className={classes.ToDoListScreenContainer}>
      <TaskModal
        formId={TASK_MODAL_FORMS.EDIT}
        task={selectedTask}
        titleText={CONSTANTS.STRINGS.EDIT_HEADER}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      ></TaskModal>
      <TaskModal
        formId={TASK_MODAL_FORMS.ADD}
        task={new TaskEntity()}
        titleText={CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      ></TaskModal>
      <Box className={classes.AppHeader}>
        <Box className={classes.AddNewToDoInput}>
          <Button
            variant={"outlined"}
            onClick={() => setOpenAddModal(true)}
            startIcon={<AddIcon />}
          >
            {CONSTANTS.STRINGS.ADD_NEW_TO_DO_LABEL}
          </Button>
        </Box>
        <Typography variant="h1" component="h2" fontFamily="cursive">
          {CONSTANTS.STRINGS.MAIN_HEADER}
        </Typography>
      </Box>

      <Box className={classes.ToDoList}>
        <TaskList onClickTask={onClickTask} tasks={tasks}></TaskList>
      </Box>
    </Box>
  );
};

export default App;
