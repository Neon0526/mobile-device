import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@mui/material';

// import './index.css';


// import App from './App';

import Main from './ui/Main.js';
import VendorList from './vendor/VendorList';
import Product from './product/Product';
const theme = createMuiTheme({

    palette: {

        primary: {

            main: '#f44336'

        },

        secondary: {

            main: '#F5B7B1'

        },
        third: {
            main: '#f47336'
        }

    }

});


ReactDOM.render (<ThemeProvider theme={theme}>


    <React.StrictMode>

        <Router>

            <Switch>

                <Route path="/vendor"
                    component={VendorList}/>

                <Route path="/Product"
                    component={Product}/>

                <Route path="/"
                    component={Main}/>
                

            </Switch>

        </Router>

    </React.StrictMode>
</ThemeProvider>, document.getElementById('root'));

