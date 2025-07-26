// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8080/graphql', // ← kendi backend endpoint’in neyse onu yaz
    }),
    cache: new InMemoryCache(),
});

export default client;



