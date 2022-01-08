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
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ProductAdd from './ProductAdd';
export default function Product(props){
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
        overflow:'scroll'
    };
    const [products, setProduct]= useState([])
    const [addVisible, setAddVisible] = useState(false);
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
    },[db, props.vendorId])
    
    const handleClose = () => {
        props.setCardVisible(false);
    }
    const handleAddClick = () => {
        setAddVisible(true)
    }

    
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
                  <EditIcon fontSize='medium' ></EditIcon> 
                  <DeleteOutlineIcon fontSize='medium'></DeleteOutlineIcon>
                </ListItem>)
            } </List>
            <Button variant="contained" onClick={()=>handleAddClick()}>新增</Button>
            <ProductAdd openAdd={addVisible} setVisible={setAddVisible} />
        </Box>
    </Modal>
    </div>
    )
    
}