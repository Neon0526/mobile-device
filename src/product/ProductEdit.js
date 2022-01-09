import React, {useState,useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, query, orderBy, setDoc, doc} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import {Dialog, Fab, DialogTitle,Input,Button, TextField, DialogContent, DialogActions, Select, MenuItem, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
export default function VendorAddEdit(props){
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [Product, setProduct] = useState({Name:props.Product.Name,Quantity:props.Product.Quantity})
    
      useEffect(()=>setProduct({...props.Product}),[props.Product]);

      const handleChange = function(e){
        setProduct({...Product,[e.target.name]:e.target.value})
      }
    
      const handleClose = () => {
        props.setEditVisible(false);
      }

      const updateProduct = async function(){
        try{
            
                const docRef = await setDoc(doc(db, "Vender",props.vendorId,"Item",props.ProductId),{
    
                    Name:Product.Name,
              
                    Quantity:Product.Quantity
              
                    });
              console.log(props.vendorId)
                
            }   
       catch(e){
        console.log(e);
      }
      props.setEditVisible(false);
    }
    return (
    <div>
    <Dialog open={props.openEdit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}>
    <DialogTitle>修改機器</DialogTitle>
    
    <TextField name="Name" value={Product.Name} variant="filled" label="Product Name" onChange={handleChange} />
    <TextField name="Quantity" value={Product.Quantity} variant="filled"  label="Quantity" type="number" InputProps={{ inputProps: { min: 0 } }} onChange={handleChange}/>   
  
    <DialogActions>
        <Button variant="contained" color="primary" onClick={updateProduct} >修改</Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>取消</Button>
    </DialogActions>
    </Dialog>
    
    </div>
    );
}
