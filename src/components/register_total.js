import React from 'react'

const RegisterTotal = (props) => {
  return (
    <div className="col-sm-6 text-center" >
      <h3 className="display-4">
        Total
      </h3>
      <h2 className="display-3">
        ${props.total}
      </h2>
    </div>
  );
}

export default RegisterTotal;