import React, {useState} from 'react';

import { Box, List, ListItem, ListItemText } from '@mui/material';

export default function ProductList() {

   

  const products= [

    {desc:"iPad", price:20000},

    {desc:"iPhone X", price:30000},

   ];

   const [selectedIndex, setSelectedIndex] =useState(1);

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

    }}>

      <List subheader="Product list" aria-label="product list">

      {products.map((product, index) => 

        <ListItem divider key={index}
        selected={selectedIndex === index}
        onClick={() => handleListItemClick(index)}
        >
            

          <ListItemText primary={product.desc} secondary={"NT$"+product.price}></ListItemText>

        </ListItem>)}

      </List>

    </Box>



  );

}