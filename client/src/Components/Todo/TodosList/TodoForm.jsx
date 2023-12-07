import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import { createTodo, getTodoById, updateTodoById } from "../Api/TodoApiService";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
export default function TodoForm() {
  const authContext = useAuth();
  const theUsername = authContext.username;

  const { id } = useParams();
  console.log(id);

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const navigate = useNavigate();

  function retrieveTodo() {
    if (id !== -1) {
      getTodoById(theUsername, id) //hena msh bnstkhdem el username fyl fetch wla haga
        .then((response) => {
          console.log(response.data.data);
          setDescription(response.data.data.description); //3alshan n7ot el data f el form
          setTargetDate(response.data.data.targetDate);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    retrieveTodo();
  }, [id]);
  //useEffect body divided into two parts
  //1. function body
  //2. dependency array
  // function body is called when the component is rendered
  // dependency array is used to specify the dependencies for the function body

  function onSubmit(values) {
    const todo = {
      id: id,
      username: theUsername,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id == -1) {
      createTodo(theUsername, todo)
        .then((response) => {
          console.log(response);
          navigate(`/todos`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateTodoById(theUsername, id, todo)
        .then((response) => {
          console.log(response);
          navigate(`/todos`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a description";
    } else if (values.description.length < 10) {
      errors.description = "Enter atleast 5 characters in description";
    }
    if (!values.targetDate) {
      errors.targetDate = "Enter a target date";
    }
    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <Formik
        initialValues={{ description, targetDate }} //will be set from UseState
        enableReinitialize={true} // this is used to set the initial values
        onSubmit={onSubmit} // onSubmit is a function which is called when the form is submitted
        validate={validate}
        validateOnBlur={false} // this is used to validate the form on blur
        validateOnChange={false} // this is used to validate the form on change
      >
        {(props) => (
          <Form>
            <ErrorMessage
              name="description"
              component="div"
              className=" alert alert-warning"
            />
            <fieldset className="form-group">
              <label>Description</label>
              <Field
                className="form-control"
                type="text"
                name="description" // name should be same as the initialValues
              />
            </fieldset>
            <ErrorMessage
              name="targetDate"
              component="div"
              className=" alert alert-warning"
            />
            <fieldset className="form-group">
              <label>Target Date</label>
              <Field className="form-control" type="date" name="targetDate" />
            </fieldset>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
