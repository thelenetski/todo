import css from "./TasksList.module.css";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/selectors";

const TasksList = () => {
  const tasks = useSelector(selectTasks);

  const visibleTasks = [...tasks].sort((a, b) =>
    a.done === b.done ? 0 : a.done ? 1 : -1
  );

  return (
    <div className={css.taskList}>
      <ul>
        {visibleTasks.map((task) => {
          return (
            <li key={task.id}>
              <Task task={task} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TasksList;
