import React, {useState, useEffect} from 'react';
import Product from '../product/Product'
import VendorAdd from './VendorAdd';
import VendorDelete from './VendorDelete';
import {initializeApp} from "firebase/app";
import {useHistory} from 'react-router';
import red from './red.png';
import green from './green.png';
import yellow from './yellow.png';
import vm_icon from './vm_icon.png';
import Image from 'material-ui-image';
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    query,
    orderBy,
    where,
    onSnapshot,
    doc
} from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Dialog,
    Button,
    Avatar,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@mui/material';
import {IconButton} from '@mui/material';
import {Delete as DeleteIcon,Edit as EditIcon, Message} from '@mui/icons-material';
import VendorAddEdit from './VendorAddEdit';
import { toast } from 'react-toastify';

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
    // overflow:'scroll'
};

export default function VendorList() {

    const history = useHistory();
    const admin = history.location.state;
    


    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [vendorId, setvendorId] = useState(NaN);
    const [removeVendorId,setRemoveVendorId] = useState(NaN);
    const [open, setOpen] = React.useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [vendors, setVendors] = useState([]);
    const [editVendor,setEditVendor] = useState(NaN);
    const [state, setState] = useState("all")
    const handleClose = () => {
        setCardVisible(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        async function readData() {
            setIsLoading(true);
            // const querySnapshot = await getDocs(collection(db, "product"))
            const querySnapshot = await getDocs(query(collection(db, "Vender"), where("status","==",state)));
            const Snapshot = await getDocs(collection(db, "Vender"))
            const temp = [];
            if(state!=="all"){
                querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    //const Snapshot = await getDocs(collection(db, "Vender/"+doc.id+"/Item"));
                    temp.push({id: doc.id, location: doc.data().location, status: doc.data().status});
                });
            }
            else{
                Snapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    //const Snapshot = await getDocs(collection(db, "Vender/"+doc.id+"/Item"));
                    temp.push({id: doc.id, location: doc.data().location, status: doc.data().status});
                });
            }
            
            // console.log(temp);
            setVendors([...temp]);
            setIsLoading(false);
        }
        readData();
    }, [db, open,removeOpen,editOpen,state]);


    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        if(admin || vendors[index].status !== "red"){
            setCardVisible(true)
        }else{
            toast.error("故障中")
        }
        
        setvendorId(vendors[index].id);

    };


    const [isLoading, setIsLoading] = useState(false);

    const insert = function (newVendor) {

        setVendors(oldVendors => [
            ...oldVendors,
            newVendor
        ]);
        setOpen(false);

    }
    
    function remove(index){
        setRemoveOpen(true);
        setRemoveVendorId(vendors[index].id);
        
    }
    function edit(index){
        setEditOpen(true);
        setEditVendor(vendors[index]);
    }
    const handleChange = (event) => {
        setState(event.target.value);
      }
    const VendorListComponent = function () {
        return (
            <List subheader="Vendor list" aria-label="vendor list">
                {
                vendors.map((vendor, index) => <ListItem divider
                    key={index}
                    index={index}
                    selected={
                        selectedIndex === index
                }>
                    <Avatar src={vm_icon} sx={{ height: '50px', width: '50px' }}> </Avatar>
                    {vendor.status === 'red' &&<Avatar src={red} sx={{ height: '20px', width: '20px' }}/>}
                    {vendor.status === 'green' &&<Avatar src={green} sx={{ height: '20px', width: '20px' }}/>}
                    {vendor.status === 'yellow' &&<Avatar src={yellow} sx={{ height: '20px', width: '20px' }}/>}

                    <ListItemText primary={
                            "販賣機位置:  "+vendor.location
                        }
                         
                        
                        onClick={
                            () => handleListItemClick(index)
                    }></ListItemText>
                    
                    {admin &&<EditIcon onClick={()=>edit(index)}></EditIcon>}

                    {admin &&<DeleteIcon onClick={()=>remove(index)}></DeleteIcon>}
        
                    

                </ListItem>)
            } </List>
        )
    }

    return (
        <Box sx={
            {
                width: '100vw',
                height: '100vh',
                backgroundColor: 'background.paper',
                color: 'black',
                textAlign: 'left'
            }
        }>
            <AppMenu/>
            <FormControl sx={{m:2,minWidth:120, textAlign:'center'}}> 
        <InputLabel id="demo-simple-select-label">狀態查詢</InputLabel>
        <Select 
          variant = "standard" 
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={state}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="all">全部</MenuItem>
          <MenuItem value="green">正常</MenuItem>
          <MenuItem value="yellow">待補貨</MenuItem>
          <MenuItem value="red">故障中</MenuItem>
        </Select>
        
      </FormControl>
            <VendorListComponent/>
            <Product vendorId={vendorId}
                setCardVisible={setCardVisible}
                cardVisible={cardVisible}/>
            {admin &&<VendorAdd open={open}
                update={insert}
                setOpen={setOpen}/>}
            {admin &&<VendorDelete vendorId={removeVendorId}
                open={removeOpen}
                setOpen={setRemoveOpen}
                />}
            {admin &&<VendorAddEdit vendor={editVendor}
                open={editOpen}
                setOpen={setEditOpen}/>}

        </Box>
    );

}

