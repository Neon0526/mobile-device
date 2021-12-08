import { useLocation } from "react-router";


export default function Receiver(){
    const location = useLocation();
    console.log("123");
    return <div>
        <p>{location.state.id}</p>
    </div>
}