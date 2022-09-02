import React, { useState, useEffect } from "react";
import {
  addNewTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../firebase/taskController";

const task = {
  title: "Este es el titulo",
  desc: "Esta es la descripción",
};

const TaskList = () => {
  // const [title, setTitle] = useState("")
  // const [desc, setDesc] = useState("")
  const [task, setTask] = useState({ title: "", desc: "" });
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState("add");

  const createNewTask = async () => {
    await addNewTask(task);
    setTask({ title: "", desc: "" });
    initializeTask();
  };

  const editTask = (id) => {
    setMode("update");
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask({ ...taskToEdit });
  };

  const updateExistingTask = async () => {
    await updateTask(task);
    setTask({ title: "", desc: "" });
    initializeTask();
    setMode("add");
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    initializeTask();
  };

  const initializeTask = () => {
    getTasks()
      .then((t) => setTasks([...t]))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    initializeTask();
  }, []);

  return (
    <div>
      <h1 className="text-slate-600 font-bold text-lg">TaskList</h1>
      <div className="flex flex-col gap-4">
        <h2>Introduce tu nueva tarea</h2>
        <input
          className="outline-none border w-full p-1 font-mono px-4 focus:ring ring-sky-500 rounded-xl shadow"
          value={task.title}
          type="text"
          placeholder="New Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          rows={3}
          className="outline-none border w-full p-1 font-mono px-4 focus:ring ring-sky-500 rounded-xl shadow"
          value={task.desc}
          type="text"
          placeholder="New Desc"
          onChange={(e) => setTask({ ...task, desc: e.target.value })}
        />
        <button
          className="bg-green-400 font-mono text-white font-semibold rounded  hover:bg-sky-400 transition-all py-1
        "
          onClick={() =>
            mode === "add" ? createNewTask() : updateExistingTask()
          }
        >
          {mode === "add" ? "Añadir" : "Actualizar"}
        </button>
      </div>
      <div className="rounded-lg border border-sky-400 p-4 grid md:grid-cols-3 gap-4 mt-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-lg border border-sky-400 p-4 flex flex-col shadow gap-3"
          >
            <h1 className="font-semibold">{task.title}</h1>
            <div className="border-t border-sky-400"></div>
            <p className="font-medium text-slate-500">{task.desc}</p>
            <div className="flex justify-evenly">
              <button
                onClick={() => editTask(task.id)}
                className="bg-green-500 p-1 px-2 rounded-lg hover:bg-green-700 transition text-white font-mono font-semibold"
              >
                Editar
              </button>
              <button
                onClick={() =>
                  window.confirm("Seguro que quieres eliminar esta tarea?") &&
                  removeTask(task.id)
                }
                className="bg-red-500 p-1 px-2 rounded-lg hover:bg-red-700 transition text-white font-mono font-semibold"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
