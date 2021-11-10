import React from 'react';



import {NavLink} from 'react-router-dom';

import { AppBar, Button, Toolbar } from '@mui/material';

 

export default function AppMenu() {

  const activeStyle = { backgroundColor:"#f8877f", color:"black" };

  return (

    <AppBar position="sticky">

      <Toolbar>

        <Button component={NavLink} to='/product' activeStyle={activeStyle} color="inherit">product</Button>

        <Button component={NavLink} to='/employee' activeStyle={activeStyle} color="inherit">employee</Button>
        <Button component={NavLink} to='/department' activeStyle={activeStyle} color="inherit">department</Button>
      </Toolbar>

    </AppBar>

  )



}