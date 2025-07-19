import css from "./TasksList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/selectors";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { setActiveType } from "../../redux/tasksSlice";
import { List } from "../List/List";

const TasksList = ({ loading }) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    dispatch(setActiveType(newValue));
    setValue(newValue);
  };
  const visibleTasks = [...tasks]
    .reverse()
    .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  return (
    <div className={css.taskList}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Купити"
              value="1"
              sx={{
                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "#1094b3",
                },
              }}
            />
            <Tab
              label="Зробити"
              value="2"
              sx={{
                "&.Mui-selected": {
                  fontWeight: "bold",
                  color: "#1094b3",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{ height: "100%", padding: 0, marginTop: "10px" }}
        >
          <List data={visibleTasks} type="buy" load={loading} />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ height: "100%", padding: 0, marginTop: "10px" }}
        >
          <List data={visibleTasks} type="todo" load={loading} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default TasksList;
