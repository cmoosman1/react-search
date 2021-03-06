import React from 'react';
import MapContainer from './components/MapContainer';
import ReactGoogleMap from './components/ReactGoogleMap';
import Search from './components/Search';
import SearchGrid from './components/SearchGrid';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from '../src/appStore/reducers/index';
import './App.css';

const userStore = createStore(reducer);

function App() {
  
  return (
      <div className="App">
        <Provider store={userStore}>
          <ReactGoogleMap />
          <Search />
          <SearchGrid />
        </Provider>
      </div>
  );
}

export default App;
