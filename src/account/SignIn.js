import React, { useState } from 'react';
import { Button, TextField,Box } from '@mui/material';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { config } from '../settings/firebaseConfig';
import { useHistory } from 'react-router';



//import { Box } from '@mui/system';



export default function SignIn(props) {

  if (getApps().length === 0) {

    initializeApp(config);

  }

  const [account, setAccount] = useState({ email: "", password: "", displayName: "" });

  const [message, setMessage] = useState("");

  const handleChange = function (e) {

    setAccount({ ...account, [e.target.name]: e.target.value })

  }

  const history = useHistory();

  const handleSubmit = async function () {

    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, account.email, account.password);
      //console.log(res);
      if (res) {
        //console.log(auth.currentUser.displayName);
        props.setStatus("signedIn");
        history.push("/VenderList");
      }
      setMessage("");

    }

    catch (error) {
      setMessage("" + error);
    }

  }
  const changeStatus = function () {
    props.setStatus("signUp");
  }


  return (
  
    
    <Box textAlign='center'>
    <form>
      <TextField type = "email" name = "email" value={account.email} 
        placeholder="電子郵件信箱" label="電子郵件信箱:" onChange={handleChange} autoComplete="email"/><br/>
      <TextField type = "password" name = "password" value={account.password}
        placeholder="密碼" label="密碼:" onChange={handleChange} autoComplete="current-password"/><br/>
      {message}<br/>
      <Button variant="contained" color="primary" onClick={handleSubmit}>登入</Button>
      <Button variant="contained" color="secondary" onClick={changeStatus}>我要註冊</Button>
    </form>
    </Box>


  );

}