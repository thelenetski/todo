import css from "./Task.module.css";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleDone } from "../../redux/tasksOps";
import {
  modalTypes,
  openConfirmDelete,
  openEditTask,
} from "../../redux/modal/slice";
import {
  selectContentModal,
  selectTypeModal,
} from "../../redux/modal/selectors";
import ModalWindow from "../Modal/Modal";
import EditForm from "../Modal/EditForm";
import { useEffect, useState } from "react";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const type = useSelector(selectTypeModal);
  const content = useSelector(selectContentModal);

  const [editedTask, setEditedTask] = useState({
    task: "",
  });

  useEffect(() => {
    if (type !== modalTypes.editTask) return;
    setEditedTask(content);
  }, [content, type]);

  const handleDelete = () => {
    dispatch(deleteTask(content.id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    dispatch(toggleDone({ ...editedTask }));
  };

  const onSuccess = () => {
    if (type === modalTypes.confirmDelete) return handleDelete();
    if (type === modalTypes.editTask) return handleEditSubmit();
  };

  // const onDelete = () => dispatch(deleteTask(task.id));

  const onDone = () => dispatch(toggleDone({ ...task, done: !task.done }));

  return (
    <>
      <div className={clsx(css.contact, task.done && css.done)}>
        <div className={css.contactData}>
          <>
            <p>{task.task}</p>
          </>
        </div>
        <div className={css.btnBox}>
          <button
            type="button"
            className={css.btnEdit}
            onClick={() => dispatch(openEditTask(task))}
          >
            <FaEdit />
          </button>
          <button type="button" className={css.btnDone} onClick={onDone}>
            {task.done ? <TbReload /> : <FaCheck />}
          </button>
          <button
            type="button"
            className={css.delete}
            onClick={() => dispatch(openConfirmDelete(task))}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {content !== null && task.id === content.id && (
        <ModalWindow onSuccess={onSuccess}>
          {type === modalTypes.editTask && (
            <EditForm
              editedTask={editedTask}
              handleEditChange={handleEditChange}
            />
          )}

          {type === modalTypes.confirmDelete && (
            <p>Ви дійсно бажаєте видалити це завдання?</p>
          )}
        </ModalWindow>
      )}
    </>
  );
};

export default Task;
