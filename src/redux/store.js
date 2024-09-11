import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasksSlice";
import { modalReducer } from "./modal/slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
  },
});
