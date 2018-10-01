import React from 'react'
import Denomination from './denomination' 

const DenominationList = (props) => {
  const denominationItems = props.denominations.map((denomination, index) => { 
      return (
        <Denomination 
          denomination={denomination} 
          key={index}
          isBalanceSheet={false}
          onDenominationChange={props.onDenominationChange} 
        />
      );
    }
  )
  return (
    <div className="denominations-list floating-label-panel position-relative mt-5">
      <div className="border border-light shadow-sm rounded p-4 pt-5">  
        <div className="position-absolute h2 bg-dark bg-light px-2 mb-0">Denominations</div>
        <div className="row">
          {denominationItems}
        </div>
      </div>
    </div>
  )
}

export default DenominationList