import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: '/graphql',   // Proxy burayı otomatik backend’e yönlendirir
    }),
    cache: new InMemoryCache(),
});

export default client;