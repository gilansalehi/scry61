import React, { Component } from 'react';

export default class Button extends Component {
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { value } = this.props;
    this.props.handleClick(value);
  }

  render() {
    const style = Object.assign({}, buttonStyle, this.props.styles);
    return (
      <span style={style} 
        className='hover-highlighter hover-hands' 
        onClick={e => this.handleClick(e)} 
        title={this.props.title || ''}
      >
        {this.props.text || this.props.children}
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
};
