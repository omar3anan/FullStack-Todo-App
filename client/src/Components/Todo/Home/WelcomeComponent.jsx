import { Link, useParams } from "react-router-dom";
import "../Login/Login.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  retrieveHelloWorldBean,
  retrieveHelloWorldBeanPathVariable,
  retrieveHelloWorldText,
} from "../Api/HelloWorldApiService";
import { useAuth } from "../Security/AuthContext";
export function WelcomeComponent() {
  const [message, setMessage] = useState("");
  // const { username } = useParams(); //same name as in the path welcome/:username
  //badal ma a7ot el username fyl Url w shaklo yb2a wehesh hastkhdem el Context
  const authContext = useAuth();
  const theUsername = authContext.username;

  console.log(theUsername);

  function callRestApiBeanUseAxios() {
    retrieveHelloWorldBean()
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("CleanUp"));
  }

  function callRestApiTextUseAxios() {
    retrieveHelloWorldText()
      .then((response) => {
        console.log(response);
        setMessage(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("CleanUp"));
  }

  function callRestApiWithPathVariable() {
    retrieveHelloWorldBeanPathVariable(theUsername)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("CleanUp"));
  }

  return (
    <div>
      <h1 className="welcomeMessage">
        Welcome to yours Todo List {theUsername}
      </h1>
      <Link to="/todos">
        <button>Go to your Todos</button>
      </Link>
      <button onClick={callRestApiBeanUseAxios}>Bean </button>
      <button onClick={callRestApiTextUseAxios}>Text </button>
      <button onClick={callRestApiWithPathVariable}>PathVariable </button>
      <h3>the Spring say {message}</h3>
    </div>
  );
}
