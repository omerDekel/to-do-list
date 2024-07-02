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
import { addTask, updateTask } from "../../../managers/redux/slices/tasksSlice";

const TaskModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (props.task?.title) {
      setTitle(props.task.title);
    }
    if (props.task?.description) {
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
    if (title.trim()) {
      if (props.formId === TASK_MODAL_FORMS.ADD) {
        task.id = 0;
        task.finishDate = null;
        dispatch(addTask(task));
        setTitle("");
        setDescription("");
      } else {
        //if there was any change in task
        if (
          props.task?.description !== description ||
          props.task?.title !== title
        ) {
          task.id = props.task?.id;
          task.isDone = props.task?.isDone;
          task.finishDate = props.task?.finishDate;
          dispatch(updateTask(task));
        }
      }
      props.onClose();
    }
  };

  return (
    <Dialog open={props.open} width="450px" height="250px">
      <Box className={classes.ModalContainer}>
        <DialogTitle>{props.titleText} </DialogTitle>
        <DialogContent className={classes.ModalContentContainer}>
          <Box>
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
          <Box>
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
          {props.task?.finishDate && <Box>

            <TextField
              disabled={true}
              variant={"standard"}
              // type={"date"}
              defaultValue={props.task?.finishDate}
              value={props.task?.finishDate}
              label={CONSTANTS.STRINGS.FINISH_DATE}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Box>}
        </DialogContent>
        <DialogActions className={classes.ModalActionsContainer}>
          <DialogActions>
            <Button onClick={() => props.onClose()} variant={"outlined"}>
              {CONSTANTS.STRINGS.CLOSE_LABEL}
            </Button>
            <Button
              type="submit"
              disabled={!title?.trim()}
              onClick={handleSubmit}
              variant={"outlined"}
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
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  open: PropTypes.bool,
  titleText: PropTypes.any,
  formId: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;
