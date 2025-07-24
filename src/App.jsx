import React from 'react';
import CreateUserForm from '@/JMDB/pages/createAcc/CreateAcc.jsx';


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
            <CreateUserForm />
        </ApolloProvider>
    );
}

export default App;
