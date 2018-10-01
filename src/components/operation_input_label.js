import React from 'react';

const OperationInputLabel = (props) => {
  return (
    <div className="col-2 text-muted p-0 text-center">
      <small> ${props.denomination.value}s </small>
    </div>
  )
}

export default OperationInputLabel;