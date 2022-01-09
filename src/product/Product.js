import React, {useEffect, useState} from 'react';
import {
    getFirestore,
    setDoc,
    doc,
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
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ProductAdd from './ProductAdd';
import ProductDelete from './ProductDelete'
import ProductEdit from './ProductEdit'
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
    const [addVisible, setAddVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [editProduct,setEditProduct] = useState(NaN);
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteProductId,setDeleteProductId] = useState(NaN);
    const [editProductId, setEditProductId] = useState(NaN);
    const db = getFirestore();
    useEffect(()=>{
        async function readCollection(){
            const Snapshot = await getDocs(collection(db, "Vender/"+props.vendorId+"/Item"))
            const temp = []
            Snapshot.forEach((doc)=>{   
                temp.push({id:doc.id,Name:doc.data().Name,Quantity:doc.data().Quantity})
            });
            setProduct([...temp])
        }

        readCollection();
    },[db, props.vendorId, addVisible, editVisible, deleteVisible])
    
    const handleClose = () => {
        props.setCardVisible(false);
    }
    const handleAddClick = () => {
        setAddVisible(true)
    }
    function edit(index){
        setEditVisible(true);
        setEditProduct(products[index]);
        setEditProductId(products[index].id)
        
    }
    function remove(index){
        setDeleteVisible(true);
        setDeleteProductId(products[index].id);
        console.log(products[index].id)
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
                    index={index}
                    >                    
                    {product.Quantity < 10 &&<ListItemText primary={ 
                            product.Name}
                        
                        secondary={<Typography variant="subtitle2" color="#FF0000">Quantity:{product.Quantity}</Typography> 
                        }>
                       
                    </ListItemText>}
                    {product.Quantity >= 10 &&<ListItemText primary={
                            product.Name
                        }
                        secondary={
                            <Typography variant="subtitle2" color="textSecondary">Quantity:{product.Quantity}</Typography>
                    }>
                       
                    </ListItemText>}
                  <EditIcon onClick={()=>edit(index)} fontSize='medium' ></EditIcon> 
                  <DeleteOutlineIcon onClick={()=>remove(index)} fontSize='medium'></DeleteOutlineIcon>

                </ListItem>)
            } </List>
            <Button variant="contained" onClick={()=>handleAddClick()}>新增</Button>
            <ProductAdd openAdd={addVisible} setAddVisible={setAddVisible} vendorId={props.vendorId}/>
            <ProductDelete setOpen={setDeleteVisible} open={deleteVisible} ProductId={deleteProductId} vendorId={props.vendorId}/>
            <ProductEdit setEditVisible={setEditVisible} openEdit={editVisible} Product={editProduct} ProductId={editProductId} vendorId={props.vendorId}/>
        </Box>
    </Modal>
    </div>
    )
    
}