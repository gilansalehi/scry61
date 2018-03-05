import React, {Component} from 'react';
import ManaSymbol from './manaSymbol';

export default class Checkbox extends Component {

  handleClick = (color) => {
    this.props.handleClick(color);
  }

  render() {
    const { symbol, value, checked } = this.props
    const border = checked ? '3px solid #efefef' : '3px solid black';
    const boxShadow = checked ? 'inset 0 0 3px white' : 'none';

    return (
      <div
        onClick={ (e) => this.handleClick( value ) }
        className='hover-highlighter hover-hands'
        style={Object.assign({}, style, { border, boxShadow })}
      >
        <ManaSymbol 
          symbol={ symbol } 
          styles={{ width:'20px', height:'20px', margin: 0, boxShadow }} 
        />
      </div>
    )
  }
}

const style = {
  display: 'inline-block',
  backgroundColor: 'gray',
  border: '3px solid black',
  borderRadius: '3px',
  lineHeight: '1.3',
  height: '20px',
  width: '20px',
}
