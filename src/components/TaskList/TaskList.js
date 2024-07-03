import { List, ListItem } from "@mui/material";
import TaskItem from "../TaskItem/TaskItem";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../managers/redux/slices/tasksSlice";
import { TaskEntity } from "../../entities/TaskEntity";
import { format } from "date-fns";

const TaskList = (props) => {
  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const curDate = new Date();
    const formattedcurDate = format(curDate, "yyyy-MM-dd'T'HH:mm:ss");
    return formattedcurDate;
  };

  const toggleTodoCompletion = (id) => {
    let index = props.tasks?.findIndex((task) => task.id === id);
    let taskToToggleCompeletion = props.tasks[index];
    let togeledCompeletionTask = new TaskEntity(
      taskToToggleCompeletion.id,
      taskToToggleCompeletion.title,
      taskToToggleCompeletion.description,
      !taskToToggleCompeletion.isDone,
      taskToToggleCompeletion.finishDate
    );
    // if task is done update the finish date
    if (togeledCompeletionTask.isDone) {
      togeledCompeletionTask.finishDate = getCurrentDate();
    }
    dispatch(updateTask(togeledCompeletionTask));
  };
  const deleteTodo = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.tasks?.map((curTask, i) => (
        <ListItem key={i}>
          <TaskItem
            task={curTask}
            onClickTask={() => props.onClickTask(curTask)}
            deleteTask={deleteTodo}
            toggleTodoCompletion={toggleTodoCompletion}
          ></TaskItem>
        </ListItem>
      ))}
    </List>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.array,
  onClickTask: PropTypes.func,
};
export default TaskList;
