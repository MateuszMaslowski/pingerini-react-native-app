import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

export const MainApolloClient = new ApolloClient({
    link: new HttpLink({
        // adb reverse tcp:8069 tcp:8000
        uri: 'http://localhost:8069/graph/',
    }), //TODO; take this link from marcin
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only',
        },
    },
    cache: new InMemoryCache(),
});
