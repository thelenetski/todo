import { TextField } from "@mui/material";

const EditForm = ({ editedTask, handleEditChange }) => {
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
    </form>
  );
};

export default EditForm;
