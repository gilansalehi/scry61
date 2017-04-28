import React, { Component, PropTypes } from 'react';

export default class Pill extends Component {
  constructor(props) {
    super(props);

    this.deletePill = this.deletePill.bind(this);

    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  deletePill(evt) { 
    evt.preventDefault();
    evt.stopPropagation();
    this.props.deletePill(this.props.pill); 
  }

  render() {
    const { name, multiple } = this.props;
    const deletePillButton = (
      <span
        style={ this.styles.deletePillButton }
        onClick={ (evt) => { this.deletePill(evt) } }
        className={ this.klasses.deletePillButton }>
        ×
      </span>
    );

    return (
      <div className={ this.klasses.pill } style={ multiple ? this.styles.pill : this.styles.noPill }>
        <span style={ this.styles.pillNameSpan } className={ this.klasses.pillName }>
          { name }
        </span>
        { multiple && deletePillButton }
      </div>
    );
  }
};

const defaultStyles = {
  pill: {
    display: 'inline-block',
    padding: '3px 5px',
    borderRadius: '3px',
    backgroundColor: '#ddd',
    margin: '3px 0 3px 3px',
    boxShadow: 'inset 0 0 1px #666',
  },
  
  noPill: {
    display: 'inline-block',
    padding: '3px 5px',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    margin: '3px 0 3px 3px',
  },

  pillNameSpan: {
    padding: '3px 5px',
  },

  deletePillButton: {
    height: '16px',
    width: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    borderRadius: '8px',
    backgroundColor: '#aaa',
    marginLeft: '2px',
  }
};

const defaultKlasses = {
  deletePillButton: 'hover-hands',
  pill: 'pill',
  pillName: 'pill-name',
};
