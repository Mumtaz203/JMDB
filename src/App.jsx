import React from 'react';
import Header from './JMDB/components/Header'; // header'ı ekliyoruz
import CreateUserForm from '@/JMDB/services/mutations/userMut';

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

    <div>
        <ApolloProvider client={client}></ApolloProvider>
        <h1>Kullanıcı Oluştur</h1>
        <CreateUserForm />
    </div>
    );
}

export default App;
