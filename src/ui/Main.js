import React from 'react';

import { useHistory } from "react-router-dom";

import {Link} from 'react-router-dom';

import { Box, Button } from '@mui/material';

import AppMenu from './AppMenu';
import ColorTabs from './ColorTabs';

 

export default function Main() {
    const history = useHistory();

  const handleClick = function (link) {

    history.push(link);

  }
 

  return (

    <Box>

    <AppMenu/>

    <Button variant="contained" color="primary" onClick={()=>handleClick("/product")}>Product</Button>

    <Button variant="contained" color="secondary" onClick={()=>handleClick("/employee")}>Employee</Button>
    <Button variant="contained" color="third" onClick={()=>handleClick("/department")}>Department</Button>
   
    <ColorTabs/>
    </Box>
    

  )



}