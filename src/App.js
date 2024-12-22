import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { IS_LOGGED_IN } from './gql/query';
import { requestNotificationPermission } from './notification';
// import global styles
import GlobalStyle from './components/GlobalStyle';
// import our routes
import Pages from './pages';

const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// create the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

// check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial load using writeQuery
client.cache.writeQuery({
  query: IS_LOGGED_IN,
  data
});

// write the cache data after cache is reset using writeQuery
client.onResetStore(() => {
  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data
  });
});

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

export default App;
