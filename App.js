import React, { useState } from "react";
import AddUser from "./Components/Users/AddUser";
import "./App.css";
import UsersList from "./Components/Users/UsersList";

const App = (props) => {

  const [usersList,setUsersList]=useState([])

  const addUserHandler=(uName,uAge,college)=>{
    setUsersList((prevUsersList)=>{
      return [...prevUsersList,{name:uName,age:uAge,college:college ,id:Math.random().toString()}]

    })
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>

  )
};

export default App;
