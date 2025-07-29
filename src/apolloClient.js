import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import {API_BASE_URL} from "./config";

const client = new ApolloClient({
    link: new HttpLink({
        uri: API_BASE_URL,   // Proxy burayı otomatik backend’e yönlendirir
    }),
    cache: new InMemoryCache(),
});

export default client;