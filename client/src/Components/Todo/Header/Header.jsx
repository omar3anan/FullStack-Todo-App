import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext, useAuth } from "../Security/AuthContext";

export default function Header() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  console.log(
    "Header check is Authenticate or not to show the Other Buttons",
    authContext.isAuthenticated
  );

  return (
    <nav className="navbar">
      <ul>
        {!isAuthenticated && (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/welcome/:username">Welcome Page</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && (
        <Link to="/logout">
          <button
            className="logout-button"
            onClick={authContext.logoutAuthenticate}
          >
            Logout
          </button>{" "}
        </Link>
      )}
    </nav>
  );
}
