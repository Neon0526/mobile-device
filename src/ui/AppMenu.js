import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';
import SignIn from '../account/SignIn';
import { getAuth, signOut } from "firebase/auth";
import {useHistory} from 'react-router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";

export default function AppMenu() {

  const activeStyle = { backgroundColor:"#F5F5DC", color:"#6495ED" };
  const [message, setMessage] = useState("");
  let history = useHistory();
  const handleSubmit = async function(){

    try {

      const auth = getAuth();

      await signOut(auth);
      setMessage("");
      history.push("/");
      toast.success(
        `Logout Successful`
      );
    }

    catch(error){

      setMessage(""+error);

    }

  }

  return (

    <AppBar position="sticky">

      <Toolbar>
        <div className='left'>
        <Button component={NavLink} to='/' activeStyle={activeStyle} color="inherit">Vendor</Button>
        </div>
        <div className='right'>
        {/*<Button component={NavLink} to='/SignOut' activeStyle={activeStyle} color="inherit">SignOut</Button>*/}
        <Button variant="contained" color="primary" onClick={handleSubmit}>登出</Button>
        {/*<Button variant="contained" color="primary" onClick={handleSubmit}>登出</Button>*/}
        </div>

        {/* <Button component={NavLink} to='/employee' activeStyle={activeStyle} color="inherit">employee</Button>
        <Button component={NavLink} to='/department' activeStyle={activeStyle} color="inherit">department</Button> */}
      </Toolbar>

    </AppBar>

  )



}