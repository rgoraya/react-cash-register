import React from 'react';

const OperationInput = (props) => {
  return (
    <input type="number" className="form-control" data-denominationtype={props.denomination.type} min="0" autoFocus={props.denomination.type === "Hundreds"} />
  )  
}

export default OperationInput;