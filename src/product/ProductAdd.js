import { Button, TextField,Input, Dialog,Fab } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, query, orderBy} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';

import React, {useState} from 'react';

export default function ProductAdd(props) {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [product, setProduct] = useState({desc:"",price:0})

  const addData = async () => {
    try{

    const docRef = await addDoc(collection(db,"product"),{

      desc:product.desc,

      price:parseInt(product.price)

      });

    console.log(docRef.id);

  }

  catch(e){

    console.log(e);

  }};

  const handleClick = function(e){

    setProduct({...product,[e.target.name]:e.target.value})

  }
  

  
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };




  const update = function(){
    addData();
    //props.update(product);
    props.setOpen(false);

  }



  return (

    <div>
    <Fab color="primary" aria-label="Add" onClick={handleClickOpen}>
        +
    </Fab>
    <Dialog open={props.open}  aria-labelledby="新增產品">
    <DialogTitle>新增產品</DialogTitle>

    產品描述:<Input type="text" name="desc" value={product.desc} onChange={handleClick}/><br/>

    產品價格:<Input type="number" name="price" value={product.price} onChange={handleClick}/><br/>

    <Button variant="contained" color="primary" onClick={update}>新增</Button>
    </Dialog>
    </div>

  );

}