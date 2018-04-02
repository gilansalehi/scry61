import React, { Component, PropTypes } from 'react';
import Button from './button';
export default class Debouncer extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.value
    };
    // debounce the passed in dispatch method
    this.changed = debounce(this.props.changed, 100);
  }

  clearInput = () => {
    this.handleChange(clear);
  }

  handleChange = e => {
    // React event weirdness requires storing
    // the synthetic event
    const val = e.target.value;
    this.setState({ value: val }, () => {
      this.changed(val)
    });
  }

  render() {
    return (
      <div className='debouncer'>
        <input style={style}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <span style={{paddingLeft:'5px'}} className='clear-field'>
          <Button text={'×'}
            handleClick={this.clearInput}
            styles={{fontWeight:'bold'}}
          />
        </span>
      </div>
    )
  }
}

const clear = { target: { value: '' } };

const debounce = function(func, delay) {
  var inDebounce = undefined;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(inDebounce);
    return inDebounce = setTimeout(function() {
      return func.apply(context, args);
    }, delay);
  }
};

const style = {
  border: '3px solid black',
  borderRadius: '3px',
  backgroundColor: 'transparent',
  padding: '3px',
  color: '#eee',
  width: '164px',
  boxSizing: 'content-box',
};

// pass in the Redux action dispatcher and the
// returned value via props
Debouncer.PropTypes = {
  changed: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};
