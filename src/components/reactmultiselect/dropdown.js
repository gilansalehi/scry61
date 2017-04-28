import React, { Component, PropTypes } from 'react';
import DropdownOption from './optionItem';
import InputField from './inputField';

export default class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.hideAll = this.hideAll.bind(this);
    this.mapToElements = this.mapToElements.bind(this);
    this.selectOption = this.selectOption.bind(this);

    // defaults listed at bottom of this file
    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  selectOption(option) {
    this.props.selectOption(option);
  }

  hideAll() {
    this.props.hideAll();
  }

  mapToElements(list) {
    return list.map((opt) => {
      return (
        <li key={ opt.name } style={ this.styles.dropdownLi } className={this.klasses.dropdownLi} >
          <DropdownOption
            name={ opt.name }
            id={ opt.id }
            depth={ opt.depth }
            disabled={ opt.disabled }
            selectOption={ this.selectOption }
            option={ opt }
            inlineStyles={ this.props.inlineStyles }
            klasses={ this.props.klasses }
          />
        </li>
      );
    });
  }

  render() {
    const { options, addOption, displayDropdown, dropDir, inputValue, inlineStyles, klasses, handleInputChange, clearInput } = this.props;
    const optionsList = this.mapToElements(options);

    return (
      <div className={ displayDropdown ? '' : 'hidden'}>
        <div
          className={ displayDropdown ? 'dropdown-hider' : 'hidden' }
          onClick={ this.hideAll }
          style={ this.styles.dropdownHider }
        >
        </div>
        <div className={ this.klasses.dropdownPositioner } style={ this.styles.dropdownPositioner }>
          <ul
            className={ displayDropdown ? dropDir : 'hidden' }
            style={ dropDir === 'down' ? this.styles.dropdown : this.styles.dropup }
          >
            <li key="dropdown-input" style={ this.styles.dropdownLi } className="clearfix">
              <InputField
                addOption={ addOption }
                clearInput={ clearInput }
                displayDropdown={ displayDropdown }
                handleInputChange={ handleInputChange }
                inputValue={ inputValue }
                inlineStyles={ inlineStyles }
                klasses={ klasses }
              />
            </li>
            { optionsList }
          </ul>
        </div>
      </div>
    );
  }
}

const defaultKlasses = {
  dropdownLi: 'hover-highlighter',
  dropdownPositioner: 'dropdown-positioner',
};

const defaultStyles = {
  dropdownPositioner: { position: 'absolute', width: '100%' },

  dropdownHider: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'transparent',
    zIndex: 50,
  },

  dropdown: {
    position: 'relative',
    backgroundColor: 'white',
    width: '90%',
    top: 0, // parent container is .r-select-container, so adjust for input height. label is 28px, input is 40px by default.
    zIndex: 100,
    maxHeight: '200px',
    overflowY: 'auto',
    overflowX: 'hidden',
    listStyle: 'none',
    borderRight: '1px solid #B2B7BA',
    borderLeft: '1px solid #B2B7BA',
    borderBottom: '1px solid #B2B7BA',
    margin: '0 auto',
  },

  dropup: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    backgroundColor: 'white',
    width: '90%',
    bottom: 0,
    zIndex: 100,
    maxHeight: '200px',
    overflowY: 'auto',
    overflowX: 'hidden',
    listStyle: 'none',
    margin: '0 10px',
    border: '1px solid #B2B7BA',
    borderBottom: 'none',
  },

  dropdownLi: {
    display: 'block',
    width: '100%',
    listStyle: 'inherits',
    padding: 0,
    margin: 0,
  },
};
