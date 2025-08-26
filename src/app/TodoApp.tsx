

"use client";

import { useState } from "react";
import NotificationButton from "./NotificationButton";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [notifyKey, setNotifyKey] = useState(0); // 🔹 counter instead of boolean
  const [lastAdded, setLastAdded] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setLastAdded(newTodo.text);
    setNotifyKey(Date.now()); // 🔹 always unique value
    setInput("");
  };

    const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
      {/* Input */}
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a task..."
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border rounded-lg">
            <span className={todo.completed ? "line-through text-gray-400" : ""}>
              {todo.text}
            </span>
                        <button
               onClick={() => deleteTodo(todo.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Notification */}
      <NotificationButton message={lastAdded} trigger={notifyKey} />
    </div>
  );
}


