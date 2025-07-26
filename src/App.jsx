
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import CreateUserForm from '@/JMDB/pages/createAcc/CreateAcc.jsx';
import SignIn from '@/JMDB/pages/signIn/SignIn.jsx'


import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from "@apollo/client"
import {onError} from "@apollo/client/link/error";

const erorLink=onError(({graphQLErrors}) => {
if (graphQLErrors) {
    graphQLErrors.map(({message}) => {
        alert(`graphQL error: ${message}`);
    });
}
});


const link=from([
    erorLink,
    new HttpLink({uri:'http://localhost:8080/graphql',})
]);


const client=new ApolloClient({
cache: new InMemoryCache(),
    link: link,
});


function App() {
    return (
        <ApolloProvider client={client}>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/create-account" element={<CreateUserForm />} />
            </Routes>
        </ApolloProvider>
    );
}

export default App;
