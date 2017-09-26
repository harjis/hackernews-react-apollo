import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

import App from './components/App';
import './styles/index.css';
import { GC_AUTH_TOKEN } from "./constans";

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7rts37j06np0146ramr9opm'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = localStorage.getItem(GC_AUTH_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
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
