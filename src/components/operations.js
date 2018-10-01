import React, {Component} from 'react';
import '../css/operations.css';
import ShowMessage from './show_message';
import OperationInputLabel from './operation_input_label';
import OperationInput from './operation_input';

class Operations extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      mode: "add",
      operationResult: []
    }
  }

  render() {
    return (
      <div className="col-md-4 mt-5 register-operations floating-label-panel">
        <div className="border border-light shadow-sm rounded p-4 pt-5">  
          <div className="position-absolute h2 bg-dark text-light px-2 mb-0">Operations</div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-light ${this.state.mode === "add" ? "active bg-dark" : ""}`} 
                onClick={()=>this.setState({mode: "add", operationResult: []})}>
                Add
              </button>
            </li>
            <li className="nav-item">
              <button 
              className={`nav-link btn btn-link text-light ${this.state.mode === "take" ? "active bg-dark" : ""}`}
              onClick={()=>this.setState({mode: "take", operationResult: []})}>
                Take
              </button>
            </li>
            <li className="nav-item">
              <button 
              className={`nav-link btn btn-link text-light ${this.state.mode === "change" ? "active bg-dark" : ""}`} 
              onClick={()=>this.setState({mode: "change", operationResult: []})}>
                Change
              </button>
            </li>
          </ul>
          {this.formForMode()}
          <ShowMessage operationResult={this.state.operationResult} />
        </div>
      </div>  
    );
  }

  formForMode() {
    const inputLabels = this.props.denominations.map((d,i)=>{ 
      return (<OperationInputLabel denomination={d} key={i}  />) 
    });
    const inputs = this.props.denominations.map((d,i)=>{ 
      return (<OperationInput denomination={d} key={i} />) 
    });

    switch (this.state.mode) {
      case "add":
        return (
          <form id="addDenominations" className="mt-4" onSubmit={ (e) => this.addDenominationsToRegister(e) }>
            <div className="row mx-1 text-center">
              {inputLabels}
            </div>
            <div className="input-group shadow">
              {inputs}
            </div>
            <button className="btn btn-dark shadow my-0 btn-block btn-flat-top" type="submit">
              <span className="oi oi-plus mr-2"></span>
              Add Denominations
            </button>
            <p className="text-center text-muted">
              <small>Enter number of $100s, $20s, $10s, $5s, $2s and $1s to <span className="text-success">add</span></small>
            </p>
          </form>
      );
      case "take":
        return (
          <form id="takeDenominations" className="mt-4" onSubmit={(e) => this.handleDenominationsSubtraction(e) }>
            <div className="row mx-1 text-center">
              {inputLabels}
            </div>
            <div className="input-group shadow">
              {inputs}
            </div>
            <button className="btn btn-dark shadow my-0 btn-block btn-flat-top" type="submit">
              <span className="oi oi-minus mr-2"></span>
              Take Denominations
            </button>
            <p className="text-center text-muted">
              <small>Enter number of $100s, $20s, $10s, $5s, $2s and $1s to <span className="text-danger">remove</span></small>
            </p>
          </form>
        )
      case "change":
        return (
          <form id="getChangeForm" className="mb-4" onSubmit={(e) => this.getChange(e) }>
            <div className="input-group mt-4 shadow">
              <input type="number" className="form-control" min="0" autoFocus />
            </div>
            <button className="btn btn-dark shadow my-0 btn-block btn-flat-top" type="submit">
              Get Change
            </button>
            <p className="text-center text-muted">
              <small>Enter the dollar amount needed in change</small>
            </p>
          </form>
        );    
      default:
        return (
          <div className="mt-4"></div>
        );          
    }
  }

  getChange(e) {
    e.preventDefault();
    
    let changeAmt = parseInt((e.target.querySelector('input').value), 10);
    let denominationsToMakeChange = [],
        countByDenominationType = {}
    
    // check if we have enough cash
    if (changeAmt > this.calculateTotal()) {
      this.setState({ operationResult: [{success: false, type: "Not enough cash!", denominations: []}] });
      return;
    }

    this.props.denominations.forEach((denomination) => {
      let countToReturn = 0;
      let denominationCount = denomination.count; 

      while (changeAmt >= denomination.value && denominationCount > 0 ) {
        changeAmt -= denomination.value;
        denominationCount --;
        countToReturn ++; 
      }

      if (countToReturn > 0) {
        denominationsToMakeChange.push({type: denomination.type, count: countToReturn})
        countByDenominationType[denomination.type] = countToReturn;
      }
    })
  
    if (changeAmt > 0) {
      this.setState({ operationResult: [{success: false, type: "Cannot make change!", denominations: []}] });
    } else {
      this.takeDenominationsFromRegister(countByDenominationType, denominationsToMakeChange, [])
    }

    // reset the form
    e.target.reset();
  }

  handleDenominationsSubtraction(e) {
    e.preventDefault();

    let countByDenominationType = {},
        denominationsToTake = [],
        denominationsToReject = [];
        
    e.target.querySelectorAll('input').forEach((input)=> { 
      let matchingDenomination = this.props.denominations.find(function(denomination) {
            return denomination.type === input.dataset.denominationtype;
          }),
          countToTake =  parseInt(input.value, 10) || 0;
      
      if (matchingDenomination.count >= countToTake) {
        countByDenominationType[input.dataset.denominationtype] = countToTake;
        if (countToTake > 0) {
          denominationsToTake.push({type: input.dataset.denominationtype, count: countToTake})  
        }
      } else {
        countByDenominationType[input.dataset.denominationtype] = 0;
        denominationsToReject.push({type: input.dataset.denominationtype, count: countToTake})
      }
    });

    this.takeDenominationsFromRegister(countByDenominationType, denominationsToTake, denominationsToReject)

    // reset the form
    e.target.reset();

  }

  takeDenominationsFromRegister(countByDenominationType, denominationsToTake, denominationsToReject) {
    let operationResultArr = [];

    // perform operation
    this.props.denominations.map((denomination)=> { 
      return denomination.count -= countByDenominationType[denomination.type] || 0; 
    })

    // update denominations
    this.props.onDenominationsChange(this.props.denominations);
    
    // Build operation messages
    if (denominationsToTake.length) {
      operationResultArr.push({success: true, type: "Took", denominations: denominationsToTake})  
    } 
    if (denominationsToReject.length) {
      operationResultArr.push({success: false, type: "Not Enough Bills to take", denominations: denominationsToReject},)  
    }
    
    // show operation messages
    this.setState({ operationResult: operationResultArr });
  }

  addDenominationsToRegister(e) {
    e.preventDefault();

    const countByDenominationType = {};
    let addedDenominations = [],
        operationResultArr = [];
    
    e.target.querySelectorAll('input').forEach((input)=> { 
      const count = parseInt(input.value, 10) || 0;
      
      countByDenominationType[input.dataset.denominationtype] = count;
      if (count > 0) {
        addedDenominations.push({type: input.dataset.denominationtype, count: count})  
      } 
    });
    
    // perform operation
    this.props.denominations.map((denomination)=> { 
      return denomination.count += countByDenominationType[denomination.type]; 
    })
    
    // update denominations
    this.props.onDenominationsChange(this.props.denominations);

    // Build operation messages
    if (addedDenominations.length) {
      operationResultArr.push({success: true, type: "Added", denominations: addedDenominations})  
    }    

    // show operation messages
    this.setState({ operationResult: operationResultArr });

    // reset the form
    e.target.reset();
  }

  calculateTotal() {
    return (
      this.props.denominations.map(denomination => { 
        return denomination.value * denomination.count 
      }).reduce( (a,b) => { return a+b }, 0 )
    ); 
  }
}

export default Operations