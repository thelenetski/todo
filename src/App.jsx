import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TasksList from "./components/TasksList/TasksList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectError, selectTasks } from "./redux/selectors";
import { Radio } from "react-loader-spinner";
import { updateTasks } from "./redux/tasksSlice";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const socket = new WebSocket("wss://serva4ok.ddns.net:8040");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);
        if (data.type === "UPDATE_TASKS" || data.type === "INITIAL_TASKS") {
          dispatch(updateTasks(data.payload));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err.message);
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

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
