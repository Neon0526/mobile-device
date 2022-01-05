// import React, {useState} from 'react';
// import { initializeApp } from "firebase/app";
// import { getFirestore, getDocs, collection, addDoc, query, orderBy} from "firebase/firestore";
// import {config} from '../settings/firebaseConfig';
// import { Dialog, Fab, DialogTitle,Input,Button } from '@mui/material';
// import { Box } from '@mui/system';
// export default function VendorAddEdit(props){
//     const firebaseApp = initializeApp(config);
//     const db = getFirestore();
//     const [vendor, setVendor] = useState({location:"",status:""})
    
//       useEffect(()=>setVendor({...props.product}),[props.product]);

//       const action = !props.vendor.id ? "新增":"修改";

//       const handleChange = function(e){

//         setVendor({...vendor,[e.target.name]:e.target.value})
    
//       }
//     const handleClickOpen = () => {
//         props.setOpen(true);
//       };
    
//       const handleClose = () => {
//         props.setOpen(false);
//       };

//       const update = function(){
//         try{
//             if(action == "新增"){
//                 const docRef = await addDoc(collection(db,"Vender"),{
    
//                     location:vendor.location,
              
//                     status:vendor.status
              
//                     });
              
//                   console.log(docRef.id);
//             }else{
//                 await setDoc(doc(db,"Vender",vendor.id),{
//                     location:vendor.location,
//                     status:vendor.status
//                 });
//             }   
//       }catch(e){
//         console.log(e);
//       }
//       props.close()
//     }
    
//     return (
//     <div>
//     <Dialog open={props.open}>
//     <DialogTitle>新增機器</DialogTitle>

//     位置:<Input type="text" name="location" value={vendor.location} onChange={handleClick} /><br/>

//     狀態:<Input type="text" name="status" value={vendor.status} onChange={handleClick}/><br/>

//     <Button variant="contained" color="primary" onClick={update} >新增</Button>
//     <Button variant="contained" color="secondary" onClick={handleClose}>取消</Button>
//     </Dialog>
    
//     </div>
//     );
// }
