import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  editTodo,
  saveEditedTodo,
  cancelEditTodo,
  toggleTodo,
} from "../redux/todoReducer";
import { MdClose, MdCloudCircle, MdDelete, MdEdit, MdSave } from "react-icons/md";

import { FaCheck } from "react-icons/fa";

export function TodoList() {
    const list = useSelector((store) => store.todos.list);
    const editingTodoId = useSelector((store) => store.todos.editingTodoId);
    const dispatch = useDispatch();
    const [editedText, setEditedText] = useState("");
  
    const reversedTodos = [...list].reverse();
  
    const remove = (id) => {
      dispatch(removeTodo(id));
    };
  
    const edit = (id, text) => {
      dispatch(editTodo(id));
      setEditedText(text);
    };
  
    const saveEdit = (id) => {
      dispatch(saveEditedTodo({ id, newText: editedText }));
      setEditedText("");
    };
  
    const cancelEdit = () => {
      dispatch(cancelEditTodo());
      setEditedText("");
    };
  
    const toggleCompletion = (id) => {
      dispatch(toggleTodo(id));
    };
  
    return (
      <ul className="w-[500px] mt-3 gap-2">
        {reversedTodos.map((todo) => (
          <div
            key={todo.id}
            style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
            className={`border bg-yellow-500 mt-10 bg-opacity-35 rounded-lg p-4 ${todo.completed ? 'line-through' : ''}`}
          >
            {editingTodoId === todo.id ? (
              <>
                <input type="text" value={editedText} className="h-10 p-2 bg-white rounded-lg" onChange={(e) => setEditedText(e.target.value)} />
                <button onClick={() => saveEdit(todo.id)} className="text-green-500 border rounded-md px-3"><FaCheck/></button>
                <button onClick={cancelEdit} className="px-3 text-red-500 border rounded-md "><MdClose/></button>
              </>
            ) : (
              <>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="checkbox border-black checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] mr-3"
                    onChange={() => toggleCompletion(todo.id)}

                  />
                  {todo.text}
                </div>
                <div className="flex gap-4">
                  <button className="bg-red-600  text-white  py-1  px-3 rounded-lg" onClick={() => remove(todo.id)}>
                    <MdDelete />
                  </button>
                  <button className="bg-red-600  text-white  py-1  px-3 rounded-lg" onClick={() => edit(todo.id, todo.text)}>
                    <MdEdit/>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
    );
  }
  