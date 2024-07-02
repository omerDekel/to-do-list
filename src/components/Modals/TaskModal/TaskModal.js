import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import classes from "./TaskModal.module.css";
import { CONSTANTS } from "../../../constants/Constants";
import { useDispatch } from "react-redux";
import { TASK_MODAL_FORMS } from "../../../enums/ClientEnums";
import { TaskEntity } from "../../../entities/TaskEntity";
import {
  addTask,
  updateTask,
} from "../../../managers/redux/reducers/TasksReducer";

const TaskModal = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if(props.task?.title){
      setTitle(props.task.title);
    }
    if(props.task?.description){
      setDescription(props.task.description);
    }
  }, [props]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    let task = new TaskEntity();
    task.description = description;
    task.title = title;
    task.isDone = false;
    //validating title
    if (task?.title.trim()) {
      if (props.formId === TASK_MODAL_FORMS.ADD) {
        dispatch(addTask(task));
        setTitle("");
        setDescription("");
      } else {
        task.id = props.task?.id;
        task.isDone = props.task?.isDone;
        task.finishDate = props.task?.finishDate;
        dispatch(updateTask(task));
      } 
      props.onClose();
    }
  };

  return (
    <Dialog open={props.open} width="450px" height="250px">
      <Box className={classes.CustomModalContainer}>
        <DialogTitle>{props.titleText} </DialogTitle>
        <DialogContent className={classes.CustomModalContentContainer}>
          <Box className={classes.EditContentModalContentContainer}>
            <TextField
              variant={"outlined"}
              type={"text"}
              value={title}
              label={CONSTANTS.STRINGS.TITLE_LABEL}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Box>
          <Box className={classes.EditContentModalContentContainer}>
            <TextField
              id="filled-multiline-static"
              disabled={false}
              label={CONSTANTS.STRINGS.DESCRIPTION_LABEL}
              multiline
              rows={4}
              value={description}
              variant="filled"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions className={classes.CustomModalActionsContainer}>
          <DialogActions>
            <Button onClick={()=>props.onClose()}>
              {CONSTANTS.STRINGS.CLOSE_LABEL}
            </Button>
            <Button
              type="submit"
              disabled={!title?.trim()}
              onClick={handleSubmit}
            >
              {CONSTANTS.STRINGS.PERFORM_LABEL}
            </Button>
          </DialogActions>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

TaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isDone: PropTypes.bool.isRequired,
  }),
  open: PropTypes.bool,
  titleText: PropTypes.any,
  formId: PropTypes.any,
  onClose:PropTypes.func.isRequired
};

export default TaskModal;
