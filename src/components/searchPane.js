import React, { Component } from 'react';
import ColorPicker from './colorPicker';
import TypePicker from './typePicker';
import MultiSelect from './reactmultiselect/multiselect';
import Button from './button';
import RangeSetter from './rangeSetter';
import RarityPicker from './rarityPicker';
import Debouncer from './debouncer';

export default class Search extends Component {

  constructor(props) {
    super(props)

    this.defaults = {
      cardName: '',
      colors: [],
      colorOptions: 'OR',
      rarity: [],
      rarityOptions: 'OR',
      cardType: '',
      cardSuperTypes: [],
      cardSuperTypeOptions: 'OR',
      cardText: '',
      format: '',
      cmc: {min: NaN, max: NaN},
      power: {min: NaN, max: NaN},
      toughness: {min: NaN, max: NaN},
    };
    this.state = Object.assign({}, this.defaults);
    this.kids = this.kids || {};
  }

  clearAll = () => {
    const defaults = Object.assign({}, this.defaults);
    this.setState(defaults);
    this.formatDropdown.restoreDefaults();
    Object.values(this.kids).forEach(k => k.clearInput());
    this.props.updateFilters({});
  }

  clearFormatDropdown = () => {
    this.setState({ format: '' });
    this.formatDropdown.restoreDefaults();
    this.props.updateFilters({ ...this.props.filters, byFormat: x => true });
  }

  updateCardNameField = e => {
    // e.preventDefault();
    const cardName = e.toLowerCase();
    this.setState({ cardName });
    this.props.updateFilters({
      ...this.props.filters,
      byName: card => card.name.toLowerCase().indexOf(cardName) !== -1,
    });
  }

  updateCardTextField = e => {
    const cardText = e.toLowerCase();
    this.setState({ cardText });
    this.props.updateFilters({
      ...this.props.filters,
      byText: card => cardText.split(' ').reduce((memo, term) => memo && card.text.toLowerCase().indexOf(term) !== -1, true),
    });
  }

  updateCardTypeField = e => {
    const cardType = e.toLowerCase();
    this.setState({ cardType });

    this.props.updateFilters({
      ...this.props.filters,
      byType: card => card.type.toLowerCase().indexOf(cardType) !== -1,
    });
  }

  updateCardSuperTypes = superType => {
    const { cardSuperTypes, cardSuperTypeOptions } = this.state;
    const newSuperTypes = cardSuperTypes.includes(superType) 
      ? cardSuperTypes.filter(st => st !== superType) 
      : cardSuperTypes.concat([superType]);
    this.setState({ cardSuperTypes: newSuperTypes });

    this.updateSuperTypeFilters(newSuperTypes, cardSuperTypeOptions);
  }

  updateSuperTypeFilters = (newSuperTypes, cardSuperTypeOptions) => {
    const superTypeFuncs = {
      'AND': card => newSuperTypes.reduce((memo, target) => memo && card.types.includes(target), true),
      'OR': card => newSuperTypes.reduce((memo, target) => memo || card.types.includes(target), false),
      'NOT': card => newSuperTypes.reduce((memo, target) => memo && !card.types.includes(target), true),
      'EXACTLY': card => new Set([card.types.length, newSuperTypes.length, new Set(card.types.concat(newSuperTypes)).size]).size === 1,
      'ONLY': card => card.types.length && card.types.reduce((memo, SuperType) => memo && newSuperTypes.includes(SuperType), true),
      'EXCLUDE_UNSELECTED': card => card.types.reduce((memo, SuperType) => memo && newSuperTypes.includes(SuperType), true),
      'ANY': card => true,
      'TYPELESS': card => card.types.length === 0,
    };
    const bySuperType = newSuperTypes.length || cardSuperTypeOptions === 'EXACTLY' ? superTypeFuncs[cardSuperTypeOptions] : superTypeFuncs['ANY'];

    this.props.updateFilters({ ...this.props.filters, bySuperType });
  }

  updateSuperTypeOptions = (value) => {
    this.setState({ cardSuperTypeOptions: value });
    this.updateSuperTypeFilters(this.state.cardSuperTypes, value);
  }

  updateColors = (color) => {
    const {colors, colorOptions} = this.state;
    const newColors = colors.includes(color) ? colors.filter(c => c !== color) : colors.concat([color]);
    this.setState({ colors: newColors });

    this.updateColorFilters(newColors, colorOptions);
  }

  updateColorFilters = (newColors, colorOptions) => {
    const colorFuncs = {
      'AND': card => newColors.reduce((memo, target) => memo && card.colors.includes(target), true),
      'OR': card => newColors.reduce((memo, target) => memo || card.colors.includes(target), false),
      'NOT': card => newColors.reduce((memo, target) => memo && !card.colors.includes(target), true),
      'EXACTLY': card => new Set([card.colors.length, newColors.length, new Set(card.colors.concat(newColors)).size]).size === 1,
      'ONLY': card => card.colors.length && card.colors.reduce((memo, color) => memo && newColors.includes(color), true),
      'EXCLUDE_UNSELECTED': card => card.colors.reduce((memo, color) => memo && newColors.includes(color), true),
      'ANY': card => true,
      'COLORLESS': card => card.colors.length === 0,
    };
    const byColor = newColors.length || colorOptions === 'EXACTLY' ? colorFuncs[colorOptions] : colorFuncs['ANY'];

    this.props.updateFilters({ ...this.props.filters, byColor });
  }

  updateColorOptions = (value) => {
    this.setState({ colorOptions: value });
    this.updateColorFilters(this.state.colors, value);
  }

  handleRarityClick = (click) => {
    const {rarity, rarityOptions} = this.state;
    const newRarities = rarity.includes(click) ? rarity.filter(r => r !== click) : rarity.concat([click]);
    this.setState({ rarity: newRarities });

    this.abstractedFilterOptions('rarities', newRarities, rarityOptions);
  }

  updateRarityOptions = (value) => {
    this.setState({ rarityOptions: value });
    this.abstractedFilterOptions('rarities', this.state.rarity, value);
  }

  abstractedFilterOptions = (filterTarget, filterValue, filterOption) => {
    const filterFuncs = {
      'AND': card => filterValue.reduce((memo, target) => memo && card[filterTarget].includes(target), true),
      'OR': card => filterValue.reduce((memo, target) => memo || card[filterTarget].includes(target), false),
      'NOT': card => filterValue.reduce((memo, target) => memo && !card[filterTarget].includes(target), true),
      'EXACTLY': card => {
        return new Set([
          card[filterTarget].length,
          filterValue.length,
          new Set(card[filterTarget].concat(filterValue)).size
        ]).size === 1;
      },
      'ONLY': card => card[filterTarget].length && card[filterTarget].reduce((memo, color) => memo && filterValue.includes(color), true),
      'EXCLUDE_UNSELECTED': card => card[filterTarget].reduce((memo, color) => memo && filterValue.includes(color), true),
      'ANY': card => true,
      'COLORLESS': card => card[filterTarget].length === 0,
    };
    let filterObj = {};
    filterObj[filterTarget] = filterValue.length || filterOption === 'EXACTLY' ? filterFuncs[filterOption] : filterFuncs['ANY'];
    // console.log("updating: " + filterTarget);
    this.props.updateFilters({ ...this.props.filters, ...filterObj });
  }

  updateFormatField = (selection) => {
    const format = selection.selectedOptions[0].name.toLowerCase();
    this.setState({ format });
    const byFormat = card => card.formats[format];
    this.props.updateFilters({...this.props.filters, byFormat });
  }

  updateRangeField = (obj, attr) => {
    const {min, max} = obj;
    const newState = Object.assign({}, this.state[attr], {min, max});
    let stateSpreader = {}; stateSpreader[attr] = newState;
    this.setState({ ...stateSpreader });
    // need to handle input values and filter values slightly differently in case input is empty string
    let [minVal, maxVal] = [parseInt(min), parseInt(max)];
    if ( isNaN(minVal) ) { minVal = -999; }
    if ( isNaN(maxVal) ) { maxVal = 999; }
    let rangeFilter = {};
    rangeFilter[attr] = card => minVal <= card[attr] && card[attr] <= maxVal;
    this.props.updateFilters({ ...this.props.filters, ...rangeFilter });
  }

  render() {
    if ( !this.props.show ) { return (<div className='search-pane--hidden'></div>); }

    const { 
      cardName, 
      colors, 
      colorOptions, 
      cardType, 
      cardSuperTypes, 
      cardSuperTypeOptions, 
      cardText, 
      cmc, 
      power, 
      toughness 
    } = this.state;
    const cmcStyle = Object.assign({}, style.input, {width:'30px'});

    return (
      <div className='search-pane clearfix'>
        <div className="search-header"> SEARCH </div>
        <label className='search-label'>
          <span style={style.span}>Name:</span>
          <Debouncer ref={self => this.kids.cardNameInput = self}
            value={cardName}
            changed={e => this.updateCardNameField(e)}
          />
        </label>
        <ColorPicker
          updateColors={ this.updateColors }
          updateOptions={ this.updateColorOptions }
          colors={ colors }
          colorOptions={ colorOptions }
        />
        <TypePicker
          refCallback={self => this.kids.cardTypeInput = self}
          inputValue={ cardType }
          changed={e => this.updateCardTypeField(e) }
          updateTypes={ this.updateCardSuperTypes }
          updateOptions={ this.updateSuperTypeOptions }
          types={ cardSuperTypes }
          typeOptions={ cardSuperTypeOptions }
          />
        <label className='search-label'>
          <span style={style.span}>Text:</span>
          <Debouncer ref={self => this.kids.cardTextInput = self}
            value={cardText}
            changed={e => this.updateCardTextField(e)}
            style={style.input}
          />
        </label>
        <label className='search-label'>
          <span style={style.span}>CMC:</span>
          <RangeSetter placeholder={'CMC'} min={cmc.min} max={cmc.max} callback={data => this.updateRangeField(data, 'cmc')} />
        </label>
        <label className='search-label'>
          <span style={style.span}>Power:</span>
          <RangeSetter placeholder={'PWR'} min={power.min} max={power.max} callback={data => this.updateRangeField(data, 'power')} />
        </label>
        <label className='search-label'>
          <span style={style.span}>Tough:</span>
          <RangeSetter placeholder={'TGH'} min={toughness.min} max={toughness.max} callback={data => this.updateRangeField(data, 'toughness')} />
        </label>
        <RarityPicker
          current={this.state.rarity}
          options={this.state.rarityOptions}
          handleClick={this.handleRarityClick}
          updateOptions={this.updateRarityOptions}
        />
        <label className='search-label'>
          <span style={style.span}>Format:</span>
          <span>
            <MultiSelect
              ref={self => this.formatDropdown = self}
              name={"Format"}
              options={[
                {name: 'Standard',  id: 0},
                {name: 'Modern',    id: 1},
                {name: 'Legacy',    id: 2},
                {name: 'Vintage',   id: 3},
                {name: 'Commander', id: 4},
              ]}
              multiple={false}
              width={'175px'}
              onChange={this.updateFormatField}
              placeholder={'choose...'}
              inlineStyles={formatDropdownStyles}
            />
          </span>
          <span style={{paddingLeft:'3px'}} className='clear-field'>
            <Button
              handleClick={this.clearFormatDropdown}
              text={'×'} styles={{fontWeight:'bold'}}
            />
          </span>
        </label>
        <label className='search-label'>
          <Button handleClick={this.clearAll} text='CLEAR ALL' styles={style.button} />
        </label>
        <label className='search-label mobile-only'>
          <Button handleClick={e => this.props.setShow({ search: false, results: true })} text='SEE RESULTS' styles={style.button} />
        </label>
      </div>
    );
  }
}

const style = {
  input: {
    border: '3px solid black',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    padding: '3px',
    color: '#eee',
    width: '164px',
  },
  ul: {
    display: 'inline-block',
  },
  span: {
    width: '100px',
    textAlign: 'left',
  },
  button: {
    display: 'inline-block',
    height: '24px',
    width: '200px',
    borderRadius: '3px',
    backgroundColor: '#333',
    color: '#ddd',
    margin: '20px auto',
    textAlign: 'center',
    lineHeight: '24px',
  },
}

const formatDropdownStyles = {
  container: {
    magin: '0',
    position: 'relative',
    fontFamily: '"Arial", sans-serif',
    textTransform: 'none',
  },
  inputOutliner: {
    border: '3px solid black',
    borderRadius: '3px',
  },
  noPill: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    fontSize: '15px',
    fontWeight: 'normal',
    color: 'lightgray',
    padding: '2px 0',
  },
  placeholder: {
    padding: '0',
    fontSize: '14px',
    fontWeight: 'normal',
    padding: '3px 5px',
    textAlign: 'left',
    color: 'gray',
  },
  dropdownLi: {
    display: 'block',
    width: '100%',
    listStyle: 'inherits',
    padding: 0,
    margin: 0,
    backgroundColor: '#999',
    color: 'black',
  },
}
