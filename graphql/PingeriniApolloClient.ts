import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        headers: {
            authorization: 'Bearer sdfjhsgvdfdsvjhsjhddsfdshfkdsf',
        },
    }), //TODO; take this link from marcin
    cache: new InMemoryCache(),
});
