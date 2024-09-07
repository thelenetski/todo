import css from "./TasksList.module.css";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/selectors";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

const TasksList = () => {
  const tasks = useSelector(selectTasks);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const visibleTasks = [...tasks].sort((a, b) =>
    a.done === b.done ? 0 : a.done ? 1 : -1
  );

  return (
    <div className={css.taskList}>
      {/* <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Купити" value="1" />
            <Tab label="Зробити" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, marginTop: "10px" }}>
          <ul>
            {visibleTasks
              .filter((item) => item.cat === "buy")
              .map((task) => {
                return (
                  <li key={task.id}>
                    <Task task={task} />
                  </li>
                );
              })}
          </ul>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, marginTop: "10px" }}>
          <ul>
            {visibleTasks
              .filter((item) => item.cat === "todo")
              .map((task) => {
                return (
                  <li key={task.id}>
                    <Task task={task} />
                  </li>
                );
              })}
          </ul>
        </TabPanel>
      </TabContext> */}
    </div>
  );
};

export default TasksList;
