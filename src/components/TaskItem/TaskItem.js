import { Box, Button, Checkbox, Typography } from "@mui/material";
import classes from "./TaskItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from 'prop-types';

const TaskItem = ({task, toggleTodoCompletion, deleteTodo,onClickTask}) => {
  return (
    <Box
      className={`${classes.ToDoItemContainer} ${
        task.isDone && classes.IsDone
      }`}
    >
      <Checkbox
        checked={task.isDone}
        onClick={() => toggleTodoCompletion(task.id)}
      />
      <Button onClick={()=> onClickTask(task)}>
      <Typography
        className={classes.ToDoItemText}
      >
        {task.title}
      </Typography></Button>
      <Button
        variant="standard"
        startIcon={<DeleteIcon />}
        onClick={() => deleteTodo(task.id)}
      ></Button>
    </Box>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired,
  deleteTodo:PropTypes.func.isRequired,
  onClickTask: PropTypes.func.isRequired
};

export default TaskItem;
