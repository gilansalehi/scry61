import React, { Component, PropTypes } from 'react';
import SelectedPills from './selectedPills';
import Dropdown from './dropdown';

/* REACT MULTISELECT
This multiselect component takes an array of options as props.  Each option must have
a name and an id attribute (id can be null).  Name is the value that the dropdown displays
for that option.

This component exposes several lifecycle methods that can be passed in as props.
Each callback get passed the current state object as its first argument.  onChange,
onSelect, onAdd, and onDelete are the ones you're most likely to use, but if you'd
like to use one of the standard react lifecycle methods, pass in the name of the
method as a prop, substituting the word 'component' with 'on' (e.g. componentWillMount
becomes onWillMount.

This component uses inlineStyles, which can be modified by passing in a Style Object
with the styles you'd like to override listed under that node's key.
*/

export default class MultiSelect extends Component {
  constructor(props) {
    super(props);

    this.defaults = {
      displayDropdown: false,
      inputValue: '',
      selectedOptions: [],
    };

    if ( props.default && Array.isArray(props.default) ) {
      this.defaults.selectedOptions = props.default;
    }

    this.state = Object.assign({}, this.defaults);
    const { onSelect, onDelete, onAdd, onChange } = this.props;
    this.callbacks = Object.assign({}, this.props.callbacks, { onSelect, onDelete, onAdd, onChange });

    // defaults listed at bottom of this file
    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  // LIFECYCLE METHODS && CALLBACKS
  componentWillMount()        { this.runCallbacks(['onWillMount']); }
  componentDidMount()         { this.runCallbacks(['onDidMount']); }
  componentWillReceiveProps() { this.runCallbacks(['onWillReceiveProps']); }
  componentWillUpdate()       { this.runCallbacks(['onWillUpdate']); }
  componentDidUpdate()        { this.runCallbacks(['onDidUpdate']); }
  componentWillUnmount()      { this.runCallbacks(['onWillUnmount']); }

  // INTERNAL METHODS (listed alphabetically)
  addOption = () => {
    const { addable, multiple } = this.props;
    if ( addable ) {
      const { inputValue, selectedOptions } = this.state;
      const newOption = { name: inputValue, id: null };
      const selectedNames = selectedOptions.map(opt => opt.name);

      if ( multiple && selectedNames.indexOf(inputValue) < 0 ) {
        this.addSelection(newOption, ['onAdd']);
      } else if ( !multiple ) {
        this.setSelection(newOption, ['onAdd']);
      }
      this.clearInput();
    }
  }

  addSelection = (selectedOption, callbacks = []) => {
    const newSelectedOptions = this.state.selectedOptions.concat(selectedOption);
    const nextState = { ...this.state, selectedOptions: newSelectedOptions };
    this.setState(nextState);
    this.runCallbacks(['onSelect', 'onChange', ...callbacks], nextState);
  }

  clearInput = () => {
    this.setState({ inputValue: '' });
  }

  deletePill = (pill) => {
    const { selectedOptions } = this.state;
    const selectedNames = selectedOptions.map(opt => opt.name);
    const idx = selectedNames.indexOf(pill.name);
    if ( idx !== -1 ) {
      const newSelectedOptions = selectedOptions.slice(0, idx).concat(
        selectedOptions.slice(idx + 1, selectedOptions.length)
      );
      const nextState = { ...this.state, selectedOptions: newSelectedOptions };
      this.setState(nextState);
      this.runCallbacks(['onDelete', 'onChange'], nextState);
    }
  }

  displayAll = () => {
    this.displayDropdown();
  }

  displayDropdown = () => {
    this.setState({ displayDropdown: true });
  }

  dropUpOrDown = () => {
    const { name, dropDir } = this.props;
    if ( this[name] ) {
      const menuBottom = this[name].getBoundingClientRect().bottom + 200;
      const menuTop = this[name].getBoundingClientRect().top - 200;
      if ( menuBottom > window.innerHeight ) { return 'up'; }
      if ( menuTop < 0 ) { return 'down'; }
    }
    return dropDir;
  }

  filterOptions = (options) => {
    const searchable = this.props.searchable;
    const { inputValue } = this.state;
    if ( typeof searchable === 'function' ) { return options.filter(searchable); }
    return options.filter(opt => opt.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ inputValue })
  }

  hideAll = () => {
    this.clearInput();
    this.hideDropdown();
  }

  hideDropdown = () => {
    this.setState({ displayDropdown: false });
  }

  prepareOptions = (options) => {
    const { selectedOptions } = this.state;
    const { searchable, sort } = this.props;
    let optionsList = options.map((option) => {
      const selectedNames = selectedOptions.map(opt => opt.name);
      const newProps = selectedNames.indexOf(option.name) < 0 ? {} : { disabled: true };
      return Object.assign({}, option, newProps);
    });
    if ( searchable ) { optionsList = this.filterOptions(optionsList); }
    if ( sort ) { optionsList = this.sortOptions(optionsList); }
    return optionsList;
  }

  restoreDefaults = () => {
    this.setState(this.defaults);
  }

  runCallbacks = (names, state = this.state) => {
    names.forEach((name) => {
      this.callbacks[name] && this.callbacks[name](state);
    });
  }

  selectOption = (selectedOption) => {
    const { selectedOptions } = this.state;
    const { multiple } = this.props;
    if ( multiple && selectedOptions.indexOf(selectedOption) === -1 ) {
      this.addSelection(selectedOption);
    } else if ( !multiple ) {
      this.setSelection(selectedOption);
    }
    this.hideAll(); // hide input and dropdown.
  }

  setSelection = (selectedOption, callbacks = []) => {
    const nextState = { ...this.state, selectedOptions: [selectedOption] };
    this.setState(nextState);
    this.runCallbacks(['onSelect', 'onChange', ...callbacks], nextState);
  }

  sortOptions = (options) => {
    const { sort } = this.props;
    if ( typeof sort === 'function' ) { return options.sort(sort); }
    return options.sort((a, b) => a.name <= b.name ? -1 : 1);
  }

  render() {
    const { inlineStyles, klasses, options, placeholder, disabled, label, name, width, multiple } = this.props;
    const { inputValue, displayDropdown, selectedOptions } = this.state;
    const optionsList = this.prepareOptions(options);
    const dropDir = this.dropdown ? this.dropUpOrDown() : 'down';
    const dropdown = (
      <Dropdown
        ref={ (dd) => { this.dropdown = dd; } }
        addOption={ this.addOption }
        clearInput={ this.clearInput }
        displayDropdown={ displayDropdown }
        dropDir={ dropDir }
        handleInputChange={ this.handleInputChange }
        hideAll={ this.hideAll }
        inputValue={ inputValue }
        inlineStyles={ inlineStyles }
        klasses={ klasses }
        options={ optionsList }
        selectOption={ this.selectOption }
      />
    );

    return (
      <div ref={ (component) => { this[name] = component; } }
        className={ [this.klasses.container, (disabled ? 'disabled' : '')].join(' ') }
        style={ Object.assign({}, this.styles.container, { width: width || '100%' }) }
      >
        { dropDir === 'up' && dropdown }
        <div className={ this.klasses.input }
          style={ this.styles.inputOutliner }
          onClick={ this.displayAll }
        >
          <SelectedPills
            deletePill={ this.deletePill }
            pills={ selectedOptions }
            inlineStyles={ inlineStyles }
            klasses={ klasses }
            placeholder={ placeholder }
            multiple={ multiple }
          />
        </div>
        { dropDir === 'down' && dropdown}
      </div>
    );
  }
}

// automagically gets overwritten by passed props.
MultiSelect.defaultProps = {
  addable: false, // determines the behavior of hitting the "Enter" key
  disabled: false,
  dropDir: 'down',
  emptySearch: 'No items matched your search.',
  inlineStyles: true,
  klasses: true,
  label: null,
  multiple: true,
  placeholder: 'Please choose...',
  searchable: true,
  searchTarget: 'name',
  sort: true, // set sort to false to handle tree-like dropdowns, order props.options accordingly.
};

MultiSelect.propTypes = {
  addable: PropTypes.bool,                      // denotes if component should allow user to add options
  name: PropTypes.string.isRequired,            // used as ref to decide whether to drop down or up
  options: PropTypes.arrayOf(PropTypes.shape({  // list of options to display
    name: PropTypes.string.isRequired,          // the text that will be displayed in the dropdown.
    id: PropTypes.number,
  })),
  callbacks: PropTypes.object,
  emptySearch: PropTypes.string,                // text to display when no items are found in a search.
  default: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  disabled: PropTypes.bool,                     // sets pointer events to none and prevents events from firing.
  dropDir: PropTypes.string,                    // specifies whether menu opens up or down by default (if it's not too close to screen edge) (eg, close to bottom of a modal, use 'up').
  label: PropTypes.string,                      // specifies label text for the input
  inlineStyles: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  klasses: PropTypes.oneOfType([                // add custom classes to the component.
    PropTypes.bool,
    PropTypes.object,
  ]),
  multiple: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,                // placeholder text for the the input field
  searchable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  sort: PropTypes.oneOfType([
    PropTypes.bool,                             // specifies whether to sort the options alphabetically or not.
    PropTypes.func,
  ]),
  width: PropTypes.string,
};

const defaultKlasses = {
  container: 'multiselect-container',
  label: 'multiselect-label',
  input: 'multiselect-input clearfix',
  inputField: 'multiselect-input-field',
  dropdownHider: 'dropdown-hider',
  dropdown: 'multiselect-dropdown',
  option: 'multiselect-option',
};

const defaultStyles = {
  container: { margin: '5px 0', position: 'relative', width: '100%' },

  label: {
    color: 'black',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    padding: '5px',
    margin: 0,
  },

  inputOutliner: {
    display: 'block',
    border: '1px solid #b2b7ba',
    borderRadius: '3px',
  },

};
