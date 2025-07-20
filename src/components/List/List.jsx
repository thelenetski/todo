import css from "./List.module.css";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/selectors";
import { useState } from "react";
import Loader from "../Loader/Loader";
import Task from "../Task/Task";
import clsx from "clsx";
import { selectList } from "../selectList";
import { VscCollapseAll } from "react-icons/vsc";

export const List = ({ data, type, load }) => {
  const loading = useSelector(selectLoading);
  const doneTasks = data.filter((task) => task.done);
  const notDoneTasks = data.filter((task) => !task.done);
  const [open, setOpen] = useState({});

  const toggleCategory = (category) => {
    setOpen((prev) => ({
      ...prev,
      [category || "інше"]: !prev[category || "інше"],
    }));
  };

  const collapseCategories = () => {
    setOpen(Object.fromEntries(Object.keys(open).map((key) => [key, false])));
  };

  return (
    data && (
      <div className={css.TaskListContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul style={{ marginBottom: "20px" }}>
              {notDoneTasks
                .filter((item) => item.type === type)
                .map((task) => {
                  return (
                    <li key={task.id}>
                      <Task task={task} loading={load} />
                    </li>
                  );
                })}
            </ul>
            {doneTasks.filter((item) => item.type === type).length > 0 && (
              <div onClick={collapseCategories} className={css.collapse}>
                Згорнути все
                <VscCollapseAll size={18} />
              </div>
            )}
            {selectList
              .sort((a, b) => {
                const valA = a.value || "інше";
                const valB = b.value || "інше";

                if (!a.value) return 1;
                if (!b.value) return -1;

                return valA.localeCompare(valB, "uk");
              })
              .map(({ value, label }, index) => {
                const catKey = value || "інше";
                const tasksInCategory = doneTasks
                  .filter((item) => item.type === type)
                  .filter((task) => (task.category || undefined) === value);
                if (tasksInCategory.length === 0) return null;

                return (
                  <div key={index} style={{ width: "100%" }}>
                    <div
                      className={css.titleBox}
                      onClick={() => {
                        toggleCategory(catKey);
                      }}
                    >
                      <h3>{(!value && "Інше") || label}</h3>
                      <div
                        className={clsx(open[catKey] && css.minimize, css.open)}
                      >
                        <div className={css.first}></div>
                        <div className={css.second}></div>
                      </div>
                    </div>
                    <ul className={clsx(!open[catKey] && css.rollDown)}>
                      {tasksInCategory.map((task) => (
                        <li key={task.id}>
                          <Task task={task} loading={load} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </>
        )}
      </div>
    )
  );
};
