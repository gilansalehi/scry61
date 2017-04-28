import React, { Component, PropTypes } from 'react';

export default class InputField extends Component {
  constructor(props) {
    super(props);

    this.clearInput = this.clearInput.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    // defaults listed at bottom of this file
    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  componentDidUpdate() {
    this.props.displayDropdown && this.focusInput();
  }

  focusInput() {
    this.inputField.focus();
  }

  handleKeyPress(evt) {
    if ( evt.key === "Enter" ) {
      evt.preventDefault();
      evt.stopPropagation();
      if ( this.props.inputValue.length ) {
        this.props.addOption();
      }
    }
  }

  handleInputChange(e) {
    !this.props.disabled && this.props.handleInputChange(e);
  }

  clearInput() {
    !this.props.disabled && this.props.clearInput();
  }

  render() {
    const { placeholder, inputValue } = this.props;

    return (
      <div style={ this.styles.inputWrapper } className={ this.klasses.inputWrapper }>
        <input ref={ (input) => { this.inputField = input; } }
          type="text"
          placeholder={ '' }
          onChange={ (e) => { this.handleInputChange(e) } }
          onKeyDown={ (e) => { this.handleKeyPress(e) } }
          value={ inputValue }
          style={ this.styles.inputField }
          className={ this.klasses.inputField }
        />
      </div>
    );
  }
}

const defaultStyles = {
  inputWrapper: {
    display: 'flex',
    padding: '5px',
  },

  inputField: {
    display: 'flex',
    flexGrow: '1',
    background: 'transparent',
    padding: '5px',
    margin: '0',
    border: '1px solid #b2b7ba',
    borderRadius: '3px',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '1.4px',
    fontFamily: 'Lato, Arial, sans-serif',
    boxShadow: 'none', // remove default styling on input field
  },
};

const defaultKlasses = {
  inputField: 'multiselect-input-field',
  inputWrapper: 'clearfix',
};
