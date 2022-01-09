import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import './index.css';
//import App from './App';

import SignIn from './account/SignIn'
import Main from './ui/Main.js';
import VendorList from './vendor/VendorList';
import Product from './product/Product';
import SignOut from './account/SignOut'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const theme = createTheme({

    palette: {

        primary: {

            main: '#87CEEB'

        },

        secondary: {

            main: '#FF6347'

        },
        third: {
            main: '#f47336'
        },
        fourth: {
            main: '#F5F5DC'
        },

    }

});


ReactDOM.render (<ThemeProvider theme={theme}>


    <React.StrictMode>

        <Router>
        <ToastContainer />
            <Switch>
                <Route path="/Vendor"
                    component={VendorList}/>

                <Route path="/Product"
                    component={Product}/>
                
                <Route path="/SignOut"
                    component={SignOut}/>

                <Route path="/"
                    component={Main}/>
                

            </Switch>

        </Router>

    </React.StrictMode>
</ThemeProvider>, document.getElementById('root'));

serviceWorkerRegistration.register();

