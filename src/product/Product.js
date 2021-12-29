import React, {useEffect, useState} from 'react';
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc
} from "firebase/firestore";
import{
    Modal, 
    Box,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { concat } from 'async';
export default function Product(props){
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow:'scroll'
    };
    const [products, setProduct]= useState([])
    const db = getFirestore();
    useEffect(()=>{
        async function readCollection(){
            const Snapshot = await getDocs(collection(db, "Vender/"+props.vendorId+"/Item"));
            const temp = []
            Snapshot.forEach((doc)=>{
                temp.push({Name:doc.data().Name,Quantity:doc.data().Quantity})
            });
            setProduct([...temp])
        }
        readCollection();
    },[props.vendorId])
    console.log("array"+products)
    const handleClose = () => {
        props.setCardVisible(false);
    };
    return (
    <div className="modal">
    <Modal title="detail"
        open={props.cardVisible} onClose={handleClose}>
        <Box sx={modalStyle}>
        <List subheader="product list" aria-label="product list">
                {
                products.map((product, index) => <ListItem divider
                    key={index}
                    >                    
                    <ListItemText primary={
                            product.Name
                        }
                        secondary={
                            "Quantity:" + product.Quantity
                    }></ListItemText>
                </ListItem>)
            } </List>
        </Box>
    </Modal>
    </div>
    )
    
}