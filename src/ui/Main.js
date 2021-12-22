import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AppMenu from './AppMenu';
import ColorTabs from './ColorTabs';
import SignUp from '../account/SignUp';
import SignIn from '../account/SignIn';
import SignOut from '../account/SignOut';


export default function Main() {
    const history = useHistory();

  const handleClick = function (link) {

    history.push(link);
    

  }
  const [status, setStatus] = useState("signIn");
  
console.log(status)
  return (
    <Box>
     {status==="signUp"?
      <SignUp setStatus={setStatus}/>
      :status==="signIn"?
      <SignIn setStatus={setStatus}/>
      :
      <SignOut setStatus={setStatus}/>
      } 

    

    {/* <ColorTabs/> */}
    </Box>
    

  )



}