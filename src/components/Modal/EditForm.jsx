import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useId } from "react";
import { selectList } from "../selectList";

const EditForm = ({ editedTask, handleEditChange }) => {
  const categorySelectId = useId();
  const task = editedTask.task;
  return (
    <form>
      {task.length > 0 && (
        <>
          <TextField
            label="Новий текст"
            name="task"
            value={editedTask.task}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth>
            <InputLabel id={categorySelectId}>Категорія</InputLabel>
            <Select
              labelId={categorySelectId}
              id="category"
              name="category"
              value={editedTask.category}
              label="Категорія"
              onChange={handleEditChange}
            >
              {selectList.map((opt, index) => (
                <MenuItem key={index} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </form>
  );
};

export default EditForm;
