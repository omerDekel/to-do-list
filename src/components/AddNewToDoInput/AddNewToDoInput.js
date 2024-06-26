import { Box, Button, TextField } from "@mui/material";
import classes from "./AddNewToDoInput.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const AddNewToDoInput = ({ addTodo, textFieldLabel }) => {
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <Box className={classes.AddNewToDoInputContainer}>
      <TextField
        variant={"outlined"}
        type={"text"}
        value={input}
        label={textFieldLabel ? textFieldLabel : ""}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <Button
        disabled={!input.trim()}
        variant={"standard"}
        onClick={handleAddTodo}
        startIcon={<AddIcon />}
      ></Button>
    </Box>
  );
};

AddNewToDoInput.propTypes = {
  textFieldLabel: PropTypes.string,
  addTodo: PropTypes.func,
};

export default AddNewToDoInput;
