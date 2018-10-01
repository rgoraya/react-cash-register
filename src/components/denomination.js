import React, {Component} from 'react'
import '../css/denominations.css';

class Denomination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBalanceSheet: this.props.isBalanceSheet,
      denominationValue: parseInt((this.props.denomination.count * this.props.denomination.value), 10).toFixed(2),
      denominationiImageURL: `${process.env.PUBLIC_URL}/denomination_images/${this.props.denomination.type.toLowerCase()}.jpg`
    };
  }

  render() {
    const denominationValue = parseInt((this.props.denomination.count * this.props.denomination.value), 10).toFixed(2);
    
    if (this.state.isBalanceSheet) {
      return (
        <tr>
        <td>{this.props.denomination.type}</td>
        <td>{this.props.denomination.count}</td>
        <td>${denominationValue}</td>
      </tr>
      );
    } else {
      return (
        <div className="mb-4 col-md-4">
          <div className="card shadow denomination-card bg-dark">
            <div className="card-header text-center text-light">
                <h4>{this.props.denomination.type}</h4>
              </div>
            <div className="card-body p-0">
              <div>
                <img className="img-fluid" src={this.state.denominationiImageURL} alt="Denomination" />
              </div>
              <button className="btn left btn-success position-absolute" onClick={() => this.addDenomination() }>
                <span className="oi oi-plus"></span>
              </button>
              {(denominationValue > 0) ?
                ( 
                  <button className="btn right btn-danger position-absolute" onClick={() => this.subtractDenomination() }>
                    <span className="oi oi-minus"></span>
                  </button> 
                ) : (null)
              }
            </div>
            <div className="card-footer text-light bg-dark clearfix">
              <span className={"badge badge-pill badge-secondary float-left "}>Count: {this.props.denomination.count}</span>
              <span className={`badge badge-pill float-right ${denominationValue > 0 ? "badge-secondary" : "badge-warning"}` } >Total: ${denominationValue}</span>
              <div></div>
            </div>
          </div>
        </div>
      )
    }
  }

  addDenomination() {
    this.props.denomination.count++;
    this.props.onDenominationChange(this.props.denomination)
  }

  subtractDenomination() {
    if (this.props.denomination.count > 0) {
      this.props.denomination.count--;
      this.props.onDenominationChange(this.props.denomination)    
    } else {

    }
  }
  
}

export default Denomination