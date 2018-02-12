import React, { Component } from 'react';
import PizzaList from './PizzaList';
import pizza from '../reducers/pizzaReducer';
import {createStore} from 'redux';
import '../styles/App.css';
import {
 ApolloClient,
 ApolloProvider,
 createNetworkInterface,
} from 'react-apollo';
import {Provider} from 'react-redux';

const networkInterface = createNetworkInterface({
  uri: 'https://core-graphql.dev.waldo.photos/pizza/',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 1000);
  },
}]);

const client = new ApolloClient({
   networkInterface,
});
const store = createStore(pizza);
class App extends Component {
  render() {   
    return (
      <ApolloProvider client={client}>
      <Provider store={store}>
      <div className="App">
        <PizzaList/>
      </div>
      </Provider>
      </ApolloProvider>
    );
  }
}

export default App;



