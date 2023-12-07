import "./App.css";

import TodoApp from "./Components/Todo/TodoApp";
import { Routes, Route } from "react-router-dom";
import { WelcomeComponent } from "./Components/Todo/Home/WelcomeComponent";
import LoginComponent from "./Components/Todo/Login/LoginComponent";
import { Error404 } from "./Components/Todo/Error404";
import TodosList from "./Components/Todo/TodosList/TodosList";
import Header from "./Components/Todo/Header/Header";
import Footer from "./Components/Todo/Footer/Footer";
import { Logout } from "./Components/Todo/Header/Logout";
import AuthProvider, { useAuth } from "./Components/Todo/Security/AuthContext";
import TodoForm from "./Components/Todo/TodosList/TodoForm";

function App() {
  //if is not authenticated, redirect to login el haga el msh ma3molha AuthenticatedRoute
  function AuthenticatedRoute({ children }) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) return children; //children are the Links

    return <LoginComponent />; //if is not authenticated, redirect to login
  }
  return (
    <div className="App">
      <AuthProvider>
        {/*<AllComponents /> */}
        {/* <Counter /> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<TodoApp />} />
          <Route exact path="/login" element={<LoginComponent />} />
          <Route
            exact
            path="/welcome"
            element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/todos"
            element={
              <AuthenticatedRoute>
                <TodosList />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/todos/:id"
            element={
              <AuthenticatedRoute>
                <TodoForm />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/logout"
            element={
              //if is not authenticated, redirect to login
              <AuthenticatedRoute>
                <Logout />
              </AuthenticatedRoute>
            }
          />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
