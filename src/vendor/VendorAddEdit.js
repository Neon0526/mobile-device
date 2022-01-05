import React, {useState,useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, query, orderBy, setDoc, doc} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import { Dialog, Fab, DialogTitle,Input,Button, TextField, DialogContent, DialogActions } from '@mui/material';
import { Box } from '@mui/system';
export default function VendorAddEdit(props){
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [vendor, setVendor] = useState({location:"",status:""})
    
      useEffect(()=>setVendor({...props.vendor}),[props.vendor]);

      const action = !props.vendor.id ? "新增":"修改";

      const handleChange = function(e){

        setVendor({...vendor,[e.target.name]:e.target.value})
    
      }
    // const handleClickOpen = () => {
    //     props.setOpen(true);
    //   };
    
      const handleClose = () => {
        props.setOpen(false);
      };

      const update = async function(){
        try{
            if(action == "新增"){
                const docRef = await addDoc(collection(db,"Vender"),{
    
                    location:vendor.location,
              
                    status:vendor.status
              
                    });
              
                  console.log(docRef.id);
            }else{
                await setDoc(doc(db,"Vender",vendor.id),{
                    location:vendor.location,
                    status:vendor.status
                });
            }   
      }catch(e){
        console.log(e);
      }
      props.setOpen(false);
    }
    
    return (
    <div>
    <Dialog open={props.open}>
    <DialogTitle>{action}機器</DialogTitle>
    
    <DialogContent>
        <TextField label ="地點" name="location" variant="outlined" value={vendor.location} onChange={handleChange}></TextField>
        <TextField label ="狀態" name="status" variant="outlined" value={vendor.status} onChange={handleChange}></TextField>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="primary" onClick={update} >{action}</Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>取消</Button>
    </DialogActions>
    </Dialog>
    
    </div>
    );
}
