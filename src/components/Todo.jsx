import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const Todo = () => {
  const [inputVal, setInputVal] = useState("");
  const [todoList, setTodoList] = useState([]);

  //Add Todo
  const addTodo = (newTodoTitle) => {
    const newTodo = {
      title: newTodoTitle,
      isCompleted: false,
      id: Math.random() * 1000,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setInputVal("");
    toast.success("Task Added");
  };

  //Delete Todo
  const deleteTodo = (id) => {
    const filteredTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodoList);
    toast.success("Task Deleted");
  };
  //   Complete Todo
  const completeTodo = (id, isCompleted) => {
    const completedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !isCompleted };
      } else {
        return todo;
      }
    });
    setTodoList(completedTodoList);
  };

  //Edit Todo
  function editTodo(id, editedTitle) {
    const editedTodoList = todoList.map((todo) => {
      if (todo.id === id && editedTitle !== "") {
        return { ...todo, title: editedTitle };
      } else {
        return todo;
      }
    });
    setTodoList(editedTodoList);
    if (editedTitle !== "") toast.success("Task Edited");
  }
  return (
    <main className="flex flex-col mt-6 min-h-[90vh] items-center justify-between gap-10 py-3 w-[40rem]">
      <Toaster />

      <div className="flex w-full flex-col justify-start items-center gap-3">
        <div className="flex w-full items-center justify-center flex-col gap-8 ">
          <h1 className="pros text-3xl  font-bold ">Todo List</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputVal !== "") {
                addTodo(inputVal);
              } else {
                toast.error("Cannot add Empty Task");
              }
            }}
            className="w-full h-[3rem] flex items-center justify-center"
          >
            <input
              type="text"
              name="todo"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              id="todo"
              placeholder="New Todo..."
              autoComplete="off"
              autoFocus
              className="border text-lg border-black w-full px-2 h-full  outline-none"
            />
            <button
              type="submit"
              className="font-semibold h-full px-4 border border-black bg-black text-white hover:opacity-80
            transition duration-100 outline-none
            "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </form>
        </div>
        {/* display Todos  */}
        <div className="todos flex items-center justify-center flex-col gap-3 w-full">
          {/* Todo  */}
          {todoList.map((todo) => {
            return (
              <div className="todo w-full flex items-center justify-between px-1">
                <div className="todo-info flex gap-2 items-center justify-center ">
                  <input
                    type="checkbox"
                    name="todo-chechk"
                    id="todo-check"
                    onChange={() => {
                      completeTodo(todo.id, todo.isCompleted);
                      if (todo.isCompleted === false) {
                        toast.success("Marked as Completed");
                      } else {
                        toast.error("Marked as Incomplete Task");
                      }
                    }}
                    value={todo.isCompleted}
                    className="accent-black transform scale-150"
                  />
                  <p
                    className={
                      todo.isCompleted === true
                        ? "text-lg font-semibold line-through decoration-4 decoration-black"
                        : "text-lg font-semibold"
                    }
                  >
                    {todo.title}
                  </p>
                </div>
                <div className="todo-btns flex gap-1 py-1 items-center justify-center">
                  <button
                    className="edit-todo-btn rounded-sm text-white bg-green-800 py-1 px-3 hover:opacity-80"
                    onClick={() => {
                      if (todo.title !== "") {
                        editTodo(todo.id, prompt("Edit your Todo", todo.title));
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                  <button
                    className="delete-todo-btn hover:opacity-80 rounded-sm text-white bg-black py-1 px-3"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={() => {
            if (todoList.length === 0) {
              toast.error("List already empty");
            } else {
              setTodoList([]);
              toast.success("All Tasks are Removed");
            }
          }}
          className="text-white hover:opacity-90 bg-black font-bold py-2 w-full"
        >
          Remove All
        </button>
      </div>
    </main>
  );
};

export default Todo;
