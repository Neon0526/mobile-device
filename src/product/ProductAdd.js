import React, {useEffect, useState} from 'react';
import {
    getFirestore,
    getDocs,
    collection
} from "firebase/firestore";
import{
    Modal, 
    Box,
    List,
    ListItem,
    ListItemText,
    Typography
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
    // useEffect(()=>{
    //     async function readCollection(){
    //         const Snapshot = await getDocs(collection(db, "Vender/"+props.vendorId+"/Item"));
    //         const temp = []
    //         Snapshot.forEach((doc)=>{
    //             temp.push({Name:doc.data().Name,Quantity:doc.data().Quantity})
    //         });
    //         setProduct([...temp])
    //     }
       
    //     readCollection();
    // },[db, props.vendorId])
    
    const handleClose = () => {
        props.setVisible(false);
    };
    return (
    <div className="modal">
    <Modal title="detail"
        open={props.openAdd} onClose={handleClose}>
        <Box sx={modalStyle} component="form">
            <Typography variant="h5" gutterBottom>
                新增商品
            </Typography>
            <div>
            <TextField id="Add_Name" variant="filled" label="Product Name" />
            <TextField id="Add_Quantiy" variant="filled"  label="Quantity" type="number" />   
            </div>    
        </Box>
    </Modal>
    </div>
    )
    
}