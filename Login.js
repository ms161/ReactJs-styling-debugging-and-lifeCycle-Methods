import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  if (action.type === 'USER_INPUT2') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  return { value: '', isValid: false };
};
/////////////////////////////////////////////////////////////
function passwordReducer(state,action){
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.val,isValid:state.value.trim().length>6}
  }
  return {value:'',isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege,setEnteredCollege]=useState('')
  const [collegeValid,setCollegeValid]=useState()
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  ///////////////////////////////////////////////////////////////////////////
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

//   useEffect(() => {
//     const time=setTimeout(() => {
//       console.log('useEffect')
//     }, 1000);
   
// return ()=>{
//   console.log('clearup function')
//   clearTimeout(time)
// }

   
//   },[enteredEmail]);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    // setEnteredEmail(event.target.value)

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && enteredCollege.trim().length>6 
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value})


    setFormIsValid(
      emailState.isValid && passwordState.isValid && enteredCollege.trim().length>6 
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };
  const collegeChangeHandler =(e)=>{
    setEnteredCollege(e.target.value)
    setFormIsValid(
      emailState.isValid && passwordState.isValid && enteredCollege.trim().length>6 
    );

  }
  const validateCollegeHandler=()=>{
    setCollegeValid(enteredCollege.trim().length>6)

  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={`${classes.control} ${collegeValid===false ?classes.invalid:''}`}>
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;