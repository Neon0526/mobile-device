import { useLocation } from "react-router";
import React, {useEffect} from 'react';
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

export default function Receiver(){
    
    const db = getFirestore();
    const location = useLocation();
    useEffect(()=>{
        async function readCollection(){
            const Snapshot = await getDocs(collection(db, "Vender/"+location.state.id+"/Item"));
            Snapshot.forEach((doc)=>{
            console.log(doc.data().Name+", "+doc.data().Quantity);
            });
        }
        readCollection();
    },[db]);
    return <div>
            <p>{location.state.id}</p>
            </div>
    
}