import React, { Component } from 'react';
import './App.css';
import ListItem from './components/ListItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Supermarket List</h1>
        <span className={'item-count'}>3 ITEMS</span>
        <ul className={'list'}>
            <ListItem label={'Milk'}/>
            <ListItem label={'Eggs'}/>
        </ul>
      </div>
    );
  }
}

export default App;
