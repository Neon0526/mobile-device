import React, {useState} from 'react';
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    query,
    orderBy
} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import {
    Dialog,
    Fab,
    DialogTitle,
    Input,
    Button,
    dividerClasses
} from '@mui/material';
import {Box} from '@mui/system';
import { doc,deleteDoc } from '@firebase/firestore';

export default function VendorDelete(props) {
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };
    const DeleteData = async () => {
        try{
        const docRef = await deleteDoc(doc(db, "Vender",props.vendorId,"Item",props.ProductId))
        console.log(props.ProductId)
        props.setOpen(false);
    }
      catch(e){
        console.log(e);
      }}
    
    
    return (
        <div>
            <Dialog open={
                    props.open
                }
                canaria-labelledby="刪除"
                onClose={handleClose}>
                <DialogTitle>刪除商品</DialogTitle>
                確定要刪除嗎？

                <Button variant="contained" color="primary" onClick= {DeleteData}>確定</Button>
                <Button variant="contained" color="secondary"onClick={handleClose}>取消</Button>
            </Dialog>
        </div>
    );

}
