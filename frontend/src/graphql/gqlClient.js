import { InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
export const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URI }),
    cache: new InMemoryCache(),
});