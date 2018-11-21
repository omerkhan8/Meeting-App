import React, { Component } from 'react';
import './App.css';
import Routes from './config/Router';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </div>

    )
  }
}

export default App;