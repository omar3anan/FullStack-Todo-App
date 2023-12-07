import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

export default function LoginComponent() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [isLoginFailed, setIsLoginFailed] = useState(false); //for login failed status

  const navigate = useNavigate();

  const authContext = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); //event.target.value is the value of the input field
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); //event.target.value is the value of the input field
  };

  async function handleSubmit() {
    if (await authContext.loginAuthenticate(username, password)) {
      //wait to get be checked
      //if(true) then navigate to welcome page
      navigate(`/welcome`);
    } else {
      setIsLoginFailed(true);
    }
  }

  return (
    <div>
      <div className="Login">
        <div className="LoginForm">
          {/* <ShowMessage /> */}
          {isLoginFailed && <div className="failed">Login Failed</div>}
          <label>User Name:</label>
          <input
            className="username" //for css
            type="text" //for input type
            name="username" //for name
            placeholder="Enter your Username" //for placeholder
            value={username} //for value (input field)
            onChange={handleUsernameChange} //for onChange
          />
          <label>Password: </label>
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Link to="/welcome">
            <button type="button" name="login" onClick={handleSubmit}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
