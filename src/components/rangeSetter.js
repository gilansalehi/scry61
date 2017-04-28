import React, {Component} from 'react';

export default class RangeSetter extends Component {

  render() {
    const { min, max, callback, placeholder } = this.props;
    return (
      <span className='range-setter'>
        <input placeholder='MIN' style={cmcStyle}
          onChange={e => callback({ min: e.target.value, max })}
          value={min === max || isNaN(min) ? '' : min }
          />
          <span style={{padding:'0 3px'}}> ≤ </span>
        <input placeholder={placeholder} style={cmcStyle}
          onChange={e => callback({ min: e.target.value, max: e.target.value })}
          value={min !== max || isNaN(max) || isNaN(min) ? '' : max}
        />
          <span style={{padding:'0 3px'}}> ≤ </span>
        <input placeholder='MAX' style={cmcStyle}
          onChange={e => callback({ min, max: e.target.value })}
          value={min === max || isNaN(max) ? '' : max}
        />
      </span>
    );
  }
}

const cmcStyle = {
  border: '3px solid black',
  borderRadius: '3px',
  backgroundColor: 'transparent',
  padding: '3px',
  color: '#eee',
  width: '30px',
};
