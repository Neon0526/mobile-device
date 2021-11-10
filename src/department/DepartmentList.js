import React, {useState} from 'react';

import { Box, List, ListItem, ListItemText} from '@mui/material';
import AppMenu from '../ui/AppMenu';



export default function DepartmentList() {

   

  const [departments] = useState([

    {id:"0", name:"IT" , count: 5},

    {id:"1", name:"Marketing", count:20},

    {id:"2", name:"Management",count:100}

   ]);

  const [selectedIndex, setSelectedIndex] = useState(0);



  const handleListItemClick = (index) => {  

    setSelectedIndex(index);

  };

  

    return (

    <Box sx={{

        width: '100vw',

        height: '100vh',

        backgroundColor: 'background.paper',

        color: 'black',

        textAlign: 'left'

    }} >

    <AppMenu/>
    <List subheader="Department list" aria-label="department list">

    {departments.map((department, index) => 

      <ListItem divider key={index} onClick={()=>handleListItemClick(index)} selected={selectedIndex === index}>

        <ListItemText primary={department.name} secondary={"@"+department.count}></ListItemText>



      </ListItem>)}



    </List>
    

    </Box>



  );

}