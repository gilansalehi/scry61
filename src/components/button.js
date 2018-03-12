import React, { Component } from 'react';

export default class Button extends Component {
  handleClick = () => {
    const { value } = this.props;
    this.props.handleClick(value);
  }

  render() {
    const style = Object.assign({}, buttonStyle, this.props.styles);
    return (
      <span style={style} 
        className='hover-highlighter hover-hands' 
        onClick={this.handleClick} 
        title={this.props.title || ''}
      >
        {this.props.text}
      </span>
    )
  }
}

const buttonStyle = {
  display: 'inline-block',
  height: '20px',
  width: '20px',
  borderRadius: '3px',
  backgroundColor: '#333',
  color: '#ddd',
  margin: '2px',
  textAlign: 'center',
  lineHeight: '21px',
};
