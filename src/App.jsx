import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TasksList from "./components/TasksList/TasksList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./redux/tasksOps";
import { selectLoading, selectError, selectTasks } from "./redux/selectors";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <h1>Shopокупка</h1>
      <p
        style={{ fontWeight: "500", margin: "10px 0" }}
      >{`- Added ${tasks.length} tasks -`}</p>
      {loading && !error && <b>Loading...</b>}
      <TasksList />
      <TaskForm />
      {/* <SearchBox value={filter} onFilter={setFilter} /> */}
    </>
  );
}

export default App;
