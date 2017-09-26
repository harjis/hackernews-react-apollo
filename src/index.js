import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from 'react-apollo';
import { ApolloLink, HttpLink, WebSocketLink } from 'apollo-link';
import { getOperationAST } from 'graphql';

import App from './components/App';
import './styles/index.css';
import { GC_AUTH_TOKEN } from './constans';

const uri = 'https://api.graph.cool/simple/v1/cj7rts37j06np0146ramr9opm';
const wsClient = {
  uri: 'wss://subscriptions.graph.cool/v1/cj7rts37j06np0146ramr9opm',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN)
    }
  }
};

const link = ApolloLink.split(
  operation => {
    // check if it is a subscription
    const operationAST = getOperationAST(operation.query, operation.operationName);
    return !!operationAST && operationAST.operation === 'subscription';
  },
  new WebSocketLink(wsClient),
  new HttpLink({ uri })
);

const client = new ApolloClient({
  networkInterface: link
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
