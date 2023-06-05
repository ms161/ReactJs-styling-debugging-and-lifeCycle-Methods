import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModel from "../UI/ErrorModel";
const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "please enter a valid name and age",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "please enter a valid  age (>0)",
      });
      //+will convert it into number
      return;
    }
    console.log(enteredAge);
    props.onAddUser(enteredUserName, enteredAge);
    setEnteredAge("");
    setEnteredUserName("");
  };
  const userNameChangeHandler = (e) => {
    setEnteredUserName(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value);
  };
  const errorHandler=()=>{
    setError(null)
  }
  return (
    <>
    { error && <  ErrorModel title= {error.title} message= {error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        {" "}
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            value={enteredUserName}
            onChange={userNameChangeHandler}
            id="username"
            type="text"
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            value={enteredAge}
            onChange={ageChangeHandler}
            type="number"
            id="age"
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};
export default AddUser;
