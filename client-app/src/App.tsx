import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { cars } from './demo';
import CarItem from './CarItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          {cars.map((car) => (
            // <li>{car.color}</li> //#1 create a CarItem component instead
            <CarItem car={car} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
