import React from 'react'
import RegisterTotal from './register_total' 
import Denomination from './denomination'

const BalanceSheet = (props) => {
  const denominationItems = props.denominations.map((denomination, index) => { 
    return (
      <Denomination 
        denomination={denomination} 
        key={index}
        isBalanceSheet={true}
        />
      );
    }
  )

  return (
    <div className="col-md-8 position-relative mt-5 floating-label-panel balance-sheet">
      <div className="border border-light shadow-sm rounded p-4 pt-5">  
        <div className="position-absolute h2 bg-dark text-light px-2 mb-0">Register Balance</div>
        <div className="row">
          <RegisterTotal total={calculateTotal(props)} />
          <div className="col-sm-6">
            <table className="table table-sm mb-0">
              <thead>
                <tr>
                  <th scope="col">Denomination</th>
                  <th scope="col">Count</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>{denominationItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const calculateTotal = (props) => {
  return (
    props.denominations.map(denomination => { 
      return denomination.value * denomination.count 
    }).reduce( (a,b) => { return a+b }, 0 )
  ); 
}

export default BalanceSheet