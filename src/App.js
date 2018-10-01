import React, { Component } from 'react';
import './App.css';
import Operations from './components/operations';
import BalanceSheet from './components/balance_sheet';
import DenominationList from './components/denomination_list';

const DenominationValues = [
  { type: "Hundreds", value: 100, count:0 }, 
  { type: "Twenties", value: 20, count:0 }, 
  { type: "Tens", value: 10, count:0 }, 
  { type: "Fives", value:5, count:0 }, 
  { type: "Twos", value:2, count:0 }, 
  { type: "Ones", value:1, count:0 }
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      denominations: this.getExistingDenominations()
    }
  }
  
  render() {
    this.setDenominationsToLocalStorage();
    return (
      <div className="container pb-5">
        <div className="row">
          <BalanceSheet denominations={ this.state.denominations } />
          <Operations 
            denominations={ this.state.denominations }
            onDenominationsChange={ (denominations) => this.setState({denominations}) }
          />
        </div>  
        <DenominationList 
          denominations={ this.state.denominations }
          onDenominationChange={ (updatedDenomination) => this.updateDenominations(updatedDenomination) }
          />
      </div>
    );
  }

  updateDenominations(updatedDenomination) {
    let denominations = this.state.denominations;
    this.setState(
      {
        denominations: denominations.map( denomination => { 
          return updatedDenomination.type === denomination.type ? updatedDenomination : denomination; 
        })
      }
    )
  }

  getExistingDenominations() {
    let denominations;
    if (localStorage.getItem("denominations") === null) {
        denominations = DenominationValues;
    } else {
      denominations = JSON.parse(localStorage.getItem("denominations"));
    }
    return denominations;
  }

  setDenominationsToLocalStorage() {
    localStorage.setItem("denominations", JSON.stringify(this.state.denominations));
  }

}

export default App;