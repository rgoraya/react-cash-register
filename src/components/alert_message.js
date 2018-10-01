import React, { Component } from 'react';

class AlertMessage extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: true }
  }
  
  render() {
      if (this.state.visible) {
        return ( 
          <div className={`text-center alert ${this.props.success ? "alert-success py-1" : "alert-danger"}`}>
            <small>{this.props.messageText}</small>
          </div> 
        );   
      } else {
        return null;
      }     
  }

  componentDidMount() {
    this.timer = () => {
      this.setState({
        visible: false
      });
    }   
    setTimeout(this.timer, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
}

export default AlertMessage;