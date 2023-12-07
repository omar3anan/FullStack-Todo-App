import { useEffect, useState } from "react";
import "./TodoList.css";
import {
  deleteTodoById,
  retrieveAllTodosForUsername,
} from "../Api/TodoApiService";
import { useAuth } from "../Security/AuthContext";
import { useNavigate } from "react-router-dom";
export default function TodosList() {
  const [todos, setTodos] = useState([]); // useState is used to set the state of the component
  const authContext = useAuth();
  const theUsername = authContext.username;

  console.log(theUsername);
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  function refreshTodos() {
    retrieveAllTodosForUsername(theUsername)
      .then((response) => {
        console.log(response);
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    refreshTodos();
  }, []); // useEffect is used to call the function when the component is rendered

  function deleteTodoClicked(id) {
    deleteTodoById(theUsername, id)
      .then((response) => {
        refreshTodos(); // refresh the todos list after deleting the todo
        setMessage(`Delete of todo ${id} Successful`);
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function updateTodoClicked(id) {
    navigate(`${id}`);
  }
  function createTodo() {
    navigate(`-1`);
  }
  return (
    <div>
      <h1>Things to do !!</h1>
      {isDeleted && <div className="message">{message}</div>}
      <table className="todos-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserName</th>
            <th>Description</th>
            <th>Done</th>
            <th>Target Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* map is used to iterate over the array */}
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.username}</td>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>{" "}
              {/* toString() is used to convert boolean to string */}
              <td>{todo.targetDate}</td>{" "}
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => updateTodoClicked(todo.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteTodoClicked(todo.id)}
                >
                  Delete
                </button>
              </td>
              {/* toLocaleDateString() is used to convert date to string */}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={createTodo}>
        Add Todo
      </button>
    </div>
  );
}
