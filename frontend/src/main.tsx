/// <reference types="vite/client" />

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? 'http://localhost:3000/graphql'
    : 'http://132.220.176.92:3000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.DEV
      ? 'ws://localhost:3000/graphql'
      : 'ws://132.220.176.92:3000/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
  );
}
