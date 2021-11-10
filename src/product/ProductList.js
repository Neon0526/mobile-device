import ProductAdd from './ProductAdd'
import { initializeApp } from "firebase/app";

import { getFirestore, getDocs, collection, addDoc, query, orderBy,onSnapshot, doc} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import { CircularProgress } from '@mui/material';
import React, {useState} from 'react';
import Input from '@mui/material/Input';
import AppMenu from '../ui/AppMenu';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

import { Box, List, ListItem, ListItemText} from '@mui/material';


export default function ProductList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const getData = async function() {

    const querySnapshot = await getDocs(collection(db, "product"));

    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots

      console.log(doc.id, " => ", doc.data());
      

    });

  

  }

  getData();

  const unsub = onSnapshot(doc(db, "product", "SF"), (doc) => {

    console.log("Current data: ", doc.data());

});

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};  
  
  const [products, setProducts] = useState([

    {desc:"iPad", price:20000},

    {desc:"iPhone X", price:30000}

   ]);
  useEffect(()=>{

    async function readData() {

      
      setIsLoading(true);
      //const querySnapshot = await getDocs(collection(db, "product"));
      const querySnapshot = await getDocs(query(collection(db, "product"), orderBy("desc")));
      const temp = [];

      querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());

        temp.push({id:doc.id, desc:doc.data().desc, price:doc.data().price});

      

      });

      console.log(temp);

      setProducts([...temp]);
      setIsLoading(false);

    }

    readData();

  },[db,open]);

   const [selectedIndex, setSelectedIndex] =useState(1);

   const handleListItemClick = (index) => {

    setSelectedIndex(index);

   };



  const [isLoading, setIsLoading] = useState(false);

  const insert = function(newProduct){

    setProducts(oldProducts=>[...oldProducts, newProduct]);
    setOpen(false);

  }
  const ProductListComponent = function (){

    return (

      <List subheader="Product list" aria-label="product list">

    {products.map((product, index) => 

  <ListItem divider key={index}
    selected={selectedIndex === index}
    onClick={() => handleListItemClick(index)}
  >

  <ListItemText primary={product.desc} secondary={"NT$"+product.price}></ListItemText>

  <IconButton edge="end" aria-label="delete" >

    <DeleteIcon />
</IconButton>

</ListItem>)}
{/* {products.map((product, index) => <li key={index}>{index} / {product.desc} / {product.price}</li>)} */}

</List>

    )

  }



  return (
    

    <div>
      <Box sx={{

        width: '100vw',

        height: '100vh',

        backgroundColor: 'background.paper',

        color: 'black',

        textAlign: 'left'

      }}>
      <AppMenu/>
      
      
      {!isLoading ?

<ProductListComponent/>

 :

<CircularProgress />

}

<ProductAdd open={open} update={insert} setOpen={setOpen}/>
</Box>



    </div>

  );

}