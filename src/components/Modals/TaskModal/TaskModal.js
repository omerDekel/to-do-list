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
  const [title, setTitle] = useState(() => props.task?.title || "");
  const [description, setDescription] = useState(() => props.task?.description || "");

  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (props.task?.title) {
      setTitle(props.task.title);
    }
    if (props.task?.description) {
      setDescription(props.task.description);
    }
  }, [props]);

  const dispatch = useDispatch();
  const validateTask = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError("Title cannot be empty.");
      isValid = false;
    } else if (title.trim().length > 100) {
      setTitleError("Title is too long. Maximum 100 characters.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (description.trim().length > 500) {
      setDescriptionError("Description is too long. Maximum 500 characters.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const initializeTask = () => {
    return new TaskEntity(
      props.task?.id || 0, // Default to 0 if no ID is provided (for new tasks)
      title.trim(),
      description.trim(),
      props.task?.isDone || false,
      props.task?.finishDate || null)
  };

  const handleSubmit = (e) => {
    if (!validateTask()) return; // Abort if validation fails
    const task = initializeTask();

    if (props.formId === TASK_MODAL_FORMS.ADD) {
      dispatch(addTask(task)); // Add new task
    } else if (
      task.description !== props.task?.description ||
      task.title !== props.task?.title
    ) {
      dispatch(updateTask(task)); // Update existing task
    }

    // Reset fields and close modal
    setTitle("");
    setDescription("");
    props.onClose();
  };

  return (
    <Dialog open={props.open}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
      width="auto"
      height="auto">
      <Box className={classes.ModalContainer}>
        <DialogTitle>{props.titleText} </DialogTitle>
        <DialogContent className={classes.ModalContentContainer}>
          <Box>
            <TextField
              variant={"outlined"}
              type={"text"}
              value={title}
              label={CONSTANTS.STRINGS.TITLE_LABEL}
              error={!!titleError}
              helperText={titleError}
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
              error={!!descriptionError}
              helperText={descriptionError}
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
