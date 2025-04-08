import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TasksList from "./components/TasksList/TasksList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "./redux/selectors";
import { Radio } from "react-loader-spinner";
import { updateTasks } from "./redux/tasksSlice";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://serva4ok.ddns.net:8040");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setLoading(true);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setLoading(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "UPDATE_TASKS" || data.type === "INITIAL_TASKS") {
          dispatch(updateTasks(data.payload));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err.message);
      }
    };

    const handleOffline = () => {
      console.warn("Internet connection lost");
      setLoading(false);
      socket.close();
    };

    const handleOnline = () => {
      console.log("Internet restored — reconnecting WebSocket...");
      setLoading(true);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      socket.close();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [dispatch]);

  return (
    <>
      <h1>Shopокупка</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#4fa94d",
          }}
        >
          {loading ? (
            <>
              <Radio
                visible={true}
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <span>online</span>{" "}
            </>
          ) : (
            <>
              <span style={{ color: "red" }}>error</span>{" "}
            </>
          )}
        </div>
        <p
          style={{ fontWeight: "500", margin: "5px 0" }}
        >{`- Додано ${tasks.length} позицій -`}</p>
      </div>
      <TasksList />
      {loading && <TaskForm />}
      {/* <SearchBox value={filter} onFilter={setFilter} /> */}
    </>
  );
}

export default App;
