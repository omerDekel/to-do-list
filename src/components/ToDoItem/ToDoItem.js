import { Box, Button, Checkbox, Typography } from "@mui/material";
import classes from "./ToDoItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from 'prop-types';

const ToDoItem = ({ todo, toggleTodoCompletion, deleteTodo}) => {
  return (
    <Box
      className={`${classes.ToDoItemContainer} ${
        todo.completed && classes.IsDone
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onClick={() => toggleTodoCompletion(todo.id)}
      />
      <Typography
        className={classes.ToDoItemText}
      >
        {todo.text}
      </Typography>
      <Button
        variant="standard"
        startIcon={<DeleteIcon />}
        onClick={() => deleteTodo(todo.id)}
      ></Button>
    </Box>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired,
  deleteTodo:PropTypes.func.isRequired
};

export default ToDoItem;
