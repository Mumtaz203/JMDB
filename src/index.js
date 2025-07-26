import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // varsa

import {ApolloProvider} from '@apollo/client';
import client from './JMDB/pages/apolloClient.js';


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);*/

const root= ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);