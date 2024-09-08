import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TasksList from "./components/TasksList/TasksList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./redux/tasksOps";
import { selectLoading, selectError, selectTasks } from "./redux/selectors";
import { Radio } from "react-loader-spinner";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchTasks());
      console.log("update");
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {loading && !error && (
        <div
          style={{
            position: "absolute",
            top: "62px",
            left: "30px",
            color: "#4fa94d",
          }}
        >
          <Radio
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <span>load</span>{" "}
        </div>
      )}

      <h1>Shopокупка</h1>
      <p
        style={{ fontWeight: "500", margin: "5px 0" }}
      >{`- Додано ${tasks.length} позицій -`}</p>
      <TasksList />
      <TaskForm />
      {/* <SearchBox value={filter} onFilter={setFilter} /> */}
    </>
  );
}

export default App;
