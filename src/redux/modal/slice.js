import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toggleDone, deleteTask } from "../tasksOps";

export const modalTypes = {
  editTask: "edit-task",
  confirmDelete: "confirm-delete",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    type: null,
    content: null,
  },
  reducers: {
    openEditTask(state, action) {
      state.isOpen = true;
      state.type = modalTypes.editTask;
      state.content = action.payload;
    },
    openConfirmDelete(state, action) {
      state.isOpen = true;
      state.type = modalTypes.confirmDelete;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(toggleDone.fulfilled, deleteTask.fulfilled),
      (state) => {
        state.isOpen = false;
        state.type = null;
        state.content = null;
      }
    );
  },
});

// Експортуємо генератори екшенів та редюсер
export const { openConfirmDelete, openEditTask, closeModal } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
