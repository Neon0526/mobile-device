// import React from 'react';
// import ReactDOM from 'react-dom';
// //import './index.css';
// import App from './App';
// //import Click from './Click';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();

import React from 'react';

import ReactDOM from 'react-dom';
import Click from './Click'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createMuiTheme,ThemeProvider } from '@mui/material';

//import './index.css';



//import App from './App';

import Main from './ui/Main.js';

import EmployeeList from './employee/EmployeeList.js';

import ProductList from './product/ProductList.js';
import DepartmentList from './department/DepartmentList.js';

const theme = createMuiTheme({

  palette: {

    primary: {

      main: '#f44336',

    },

    secondary: {

      main: '#F5B7B1',

    },
    third:{
      main: '#f47336',
    }

  },

});


ReactDOM.render(
  <ThemeProvider theme={theme}>


  <React.StrictMode>

    <Router>

        <Switch>

            <Route path="/product" component={ProductList}/>

            <Route path="/employee" component={EmployeeList}/>

            <Route path="/department" component={DepartmentList}/>

            <Route path="/" component={Main}/>

        </Switch>

    </Router>

  </React.StrictMode>
  </ThemeProvider>

, document.getElementById('root'));
