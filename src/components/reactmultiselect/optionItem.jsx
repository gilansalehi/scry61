import React, { Component, PropTypes } from 'react';

export default class DropdownOption extends Component {
  constructor(props) {
    super(props);

    this.handleOptionClick = this.handleOptionClick.bind(this);

    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  handleOptionClick() {
    this.props.selectOption(this.props.option);
  }

  render() {
    const indent = this.props.depth * 20 || 0;
    const { disabled } = this.props;
    const color = ( disabled ? 'lightgray' : '#666565' );
    const styleObj = Object.assign(
      {},
      this.styles.dropdownOptionSpan,
      { paddingLeft: `${0 + indent}px`, color },
    );

    return (
      <div
        onClick={ this.handleOptionClick }
        style={ this.styles.dropdownOptionContainer }
      >
        <div style={ styleObj }>
          { this.props.name }
        </div >
      </div>
    );
  }
}

DropdownOption.defaultProps = {
  name: 'name',
  id: 'id',
};

DropdownOption.PropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  styles: PropTypes.object,
};

const defaultKlasses = {
  dropdownOption: 'hover-highlighter',
};

const defaultStyles = {
  dropdownOptionSpan: { width: '100%' },
  dropdownOptionContainer: { padding: '5px 0' },
};
