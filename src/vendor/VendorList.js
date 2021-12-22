import React, {useState, useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {useHistory } from 'react-router';
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
import {config} from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import {Box, List, ListItem, ListItemText} from '@mui/material';
export default function VendorList() {

    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    // const getData = async function() {
    // const querySnapshot = await getDocs(collection(db, "V_test"));
    // querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    // });
    // }
    // getData();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [vendors, setVendors] = useState([]);
    useEffect(() => {
        async function readData() {
            setIsLoading(true);
            // const querySnapshot = await getDocs(collection(db, "product"));
            const querySnapshot = await getDocs(query(collection(db, "V_test"), orderBy("location")));
            const temp = [];
            querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                temp.push({id: doc.id, location: doc.data().location, status: doc.data().status});
            });
            console.log(temp);
            setVendors([... temp]);
            setIsLoading(false);
        }
        readData();
    }, [db, open]);
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    let history = useHistory();
    const handleListItemClick = (index) => {
        
        setSelectedIndex(index);
        //console.log(vendors[index].id);
        history.push("/Product",{id:vendors[index].id});
        
    };
    const [isLoading, setIsLoading] = useState(false);

    const VendorListComponent = function () {
        return (<List subheader="Vendor list" aria-label="vendor list"> {
            vendors.map((vendor, index) => <ListItem divider
                key={index}
                selected={
                    selectedIndex === index
                }
                onClick={
                    () => handleListItemClick(index)
            }>


                <ListItemText primary={
                        vendor.location
                    }
                    secondary={
                        "status:" + vendor.status
                }></ListItemText>
            </ListItem>)
        } </List>)
    }


    return (<Box 
    sx={
        {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }

    }>
        <AppMenu/>
        <VendorListComponent/>
    </Box>);

}
