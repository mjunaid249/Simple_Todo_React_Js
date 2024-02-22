import React, { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };
    setList([...list, newTodo]);

    setInput("");
  };

  const deleteTodo = (id) => {
    const newList = list.filter((i) => i.id !== id);
    setList(newList);
  };

  return (
    <div className="bg-slate-400 h-screen flex items-center justify-start flex-col py-10 gap-4">
      <h1 className="text-4xl font-bold text-center">Todo List</h1>
      <form
        className="gap-5 flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(input);
        }}
      >
        <input
          type="text"
          autoFocus
          value={input}
          className="w-[24rem] p-2 border border-slate-700 outline-none rounded-md"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="py-2 px-6 hover:opacity-70 bg-slate-950 text-white rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="todos flex flex-col gap-4">
        <h1 className="text-center font-bold text-3xl">Your Tasks</h1>
        {list.map((i) => {
          return (
            <div
              key={i.id}
              className="todo flex items-center justify-between min-w-[30rem] bg-slate-900 text-white p-4 rounded-lg"
            >
              <p>{i.todo}</p>
              <button
                onClick={() => deleteTodo(i.id)}
                className="py-2 px-3 hover:opacity-70 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
