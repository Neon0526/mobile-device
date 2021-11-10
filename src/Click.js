import React,{useState} from 'react';
export default function Click() {
  const [count, setCount] = useState([]);
  console.log("here");

  const handleClick = function() {
  console.log(count);
    count.push(Math.floor(Math.random() * 11));
    setCount([...count]);
 }

return (
    <button onClick={handleClick}>{count}</button>
  );

}