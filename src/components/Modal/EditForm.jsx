import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useId } from "react";

const EditForm = ({ editedTask, handleEditChange }) => {
  const categorySelectId = useId();

  return (
    <form>
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
          <MenuItem value="">- Нічого -</MenuItem>
          <MenuItem value="молочне">Молочне</MenuItem>
          <MenuItem value="мясне">Мясне</MenuItem>
          <MenuItem value="напої">Напої</MenuItem>
          <MenuItem value="овочі">Овочі</MenuItem>
          <MenuItem value="солодке">Солодке</MenuItem>
          <MenuItem value="фрукти">Фрукти</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default EditForm;
