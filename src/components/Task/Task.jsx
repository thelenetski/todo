import css from "./Task.module.css";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { deleteTask, toggleDone } from "../../redux/tasksOps";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const onDelete = () => dispatch(deleteTask(task.id));

  const onDone = () => dispatch(toggleDone(task));

  return (
    <div className={clsx(css.contact, task.done && css.done)}>
      <div className={css.contactData}>
        <div>
          {task.done ? <FaCheck /> : <FaEdit />}
          <p>{task.task}</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button" className={css.btnDone} onClick={onDone}>
          {task.done ? "UnDone" : "Done"}
        </button>
        <button type="button" className={css.delete} onClick={onDelete}>
          Del
        </button>
      </div>
    </div>
  );
};

export default Task;
