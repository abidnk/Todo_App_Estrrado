import { createSlice } from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: loadTodosFromLocalStorage(),
    editingTodoId: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });

      saveTodosToLocalStorage(state.list);
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.list);
    },
    editTodo: (state, action) => {
      state.editingTodoId = action.payload;
    },
    saveEditedTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todoToEdit = state.list.find((todo) => todo.id === id);

      if (todoToEdit) {
        todoToEdit.text = newText;
        saveTodosToLocalStorage(state.list);
      }

      state.editingTodoId = null;
    },
    toggleTodo: (state, action) => {
      const todoToToggle = state.list.find((todo) => todo.id === action.payload);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
        saveTodosToLocalStorage(state.list);
      }
    },
    cancelEditTodo: (state) => {
      state.editingTodoId = null;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  saveEditedTodo,
  toggleTodo,
  cancelEditTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
