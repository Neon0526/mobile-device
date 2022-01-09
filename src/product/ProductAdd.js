import React, {useEffect, useState} from 'react';
import {
    getFirestore,
    addDoc,
    collection,
    CollectionReference
} from "firebase/firestore";
import{
    Modal, 
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    Button
} from '@mui/material';
import TextField from '@mui/material/TextField';
export default function ProductAdd(props){
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    };
    const db = getFirestore();
    const [product, setproduct] = useState({Name:"", Quantity:""})
    const addProduct = async () => {
        try{
    
        const docRef = await addDoc(collection(db,"Vender/"+props.vendorId+"/Item"),{
    
          Name:product.Name,
    
          Quantity:product.Quantity
    
          });

    
      }
    
      catch(e){
    
        console.log(e);
    
      }};
    const handleClose = () => {
        props.setAddVisible(false);
    }
    const handleClick = function(e){

        setproduct({...product,[e.target.name]:e.target.value})
    
      }

    const add = function(){
        addProduct();
        props.setAddVisible(false);
    
      }
    return (
    <div className="modal">
    <Modal title="detail"
        open={props.openAdd} onClose={handleClose}>
        <Box sx={modalStyle} component="form">
            <Typography variant="h5" gutterBottom>
                新增商品
            </Typography>
            <div>
            <TextField name="Name" value={product.Name} variant="filled" label="Product Name" onChange={handleClick} />
            <TextField name="Quantity" value={product.Quantity} variant="filled"  label="Quantity" type="number" InputProps={{ inputProps: { min: 0 } }} onChange={handleClick}/>   
            </div>
            <Button variant="contained" color="primary" onClick={add} >新增</Button>  
        </Box>
    </Modal>
    </div>
    )
    
}