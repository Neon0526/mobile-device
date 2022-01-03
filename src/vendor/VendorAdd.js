import React, {useState} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, query, orderBy} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import { Dialog, Fab, DialogTitle,Input,Button } from '@mui/material';
import { Box } from '@mui/system';
export default function VendorAdd(props){
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [vendor, setVendor] = useState({location:"",status:""})
    const addData = async () => {
        try{
    
        const docRef = await addDoc(collection(db,"Vender"),{
    
          location:vendor.location,
    
          status:vendor.status
    
          });
    
        console.log(docRef.id);
    
      }
    
      catch(e){
    
        console.log(e);
    
      }};

      const handleClick = function(e){

        setVendor({...vendor,[e.target.name]:e.target.value})
    
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
    <Dialog open={props.open} canaria-labelledby="新增機器" onClose={handleClose}>
    <DialogTitle>新增機器</DialogTitle>

    位置:<Input type="text" name="location" value={vendor.location} onChange={handleClick} /><br/>

    狀態:<Input type="text" name="status" value={vendor.status} onChange={handleClick}/><br/>

    <Button variant="contained" color="primary" onClick={update} >新增</Button>
    <Button variant="contained" color="secondary" onClick={handleClose}>取消</Button>
    </Dialog>
    
    </div>
    );
}