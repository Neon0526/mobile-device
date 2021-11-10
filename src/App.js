import react from 'react';
//import logo from './logo.svg';
import './App.css';
import ProductList from './product/ProductList';
import ProductAdd from './product/ProductAdd';
import Click from './Click';

function App() {

  return (

    <div className="App">

      <header className="App-header">

        <ProductList/>
        
        {/* <ProductAdd/> */}

      </header>

    </div>

  );

}

export default App;
