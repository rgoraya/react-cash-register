import React from 'react'
import AlertMessage from './alert_message'

const ShowMessage = (props) => {
  if (!props.operationResult.length) {
    return null;
  }

  const alertMessages = props.operationResult.map((result, index) => {
    let messageText = `${result.type} `;
    messageText += result.denominations.map((denomination) => {
      return `${denomination.count}x${denomination.type}` 
    }).join(', ');

    return (
      <AlertMessage 
        messageText={messageText}
        success={result.success}
        key={index}/>  
    )
  })

  return (
    <div>    
      {alertMessages}
    </div>
  )
}

export default ShowMessage;