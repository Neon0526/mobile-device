import React from 'react';
import {NavLink} from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';

 

export default function AppMenu() {

  const activeStyle = { backgroundColor:"#F5F5DC", color:"#6495ED" };

  return (

    <AppBar position="sticky">

      <Toolbar>
        <div className='left'>
        <Button component={NavLink} to='/' activeStyle={activeStyle} color="inherit">vendor</Button>
        </div>
        <div className='right'>
        {/*<Button component={NavLink} to='/SignOut' activeStyle={activeStyle} color="inherit">SignOut</Button>*/}
        {/*<Button variant="contained" color="primary" onClick={handleSubmit}>登出</Button>*/}
        </div>

        {/* <Button component={NavLink} to='/employee' activeStyle={activeStyle} color="inherit">employee</Button>
        <Button component={NavLink} to='/department' activeStyle={activeStyle} color="inherit">department</Button> */}
      </Toolbar>

    </AppBar>

  )



}