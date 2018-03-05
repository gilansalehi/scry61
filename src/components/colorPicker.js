import React, {Component} from 'react';
import Checkbox from './checkbox';
import ManaSymbol from './manaSymbol';
import SearchRefiner from './searchRefiner';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = { hidden: true }
  }

  expand = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  handleClick = (color) => {
    this.props.updateColors(color);
  }

  updateOptions = (value) => {
    this.props.updateOptions(value);
  }

  render() {
    const { colors, colorOptions } = this.props;
    return (
      <div>
        <div className='main-options'>
          <label>
            <span style={style.span}>Color:</span>
            <ul className='colors' style={style.ul}>
              <li style={style.li}><Checkbox checked={colors.includes('White')} handleClick={ (color) => this.handleClick(color) } symbol='W' value='White'/></li>
              <li style={style.li}><Checkbox checked={colors.includes('Blue')}  handleClick={ (color) => this.handleClick(color) } symbol='U' value='Blue' /></li>
              <li style={style.li}><Checkbox checked={colors.includes('Black')} handleClick={ (color) => this.handleClick(color) } symbol='B' value='Black'/></li>
              <li style={style.li}><Checkbox checked={colors.includes('Red')}   handleClick={ (color) => this.handleClick(color) } symbol='R' value='Red'  /></li>
              <li style={style.li}><Checkbox checked={colors.includes('Green')} handleClick={ (color) => this.handleClick(color) } symbol='G' value='Green'/></li>
            </ul>
          </label>
          <span className='expando hover-hands' onClick={ this.expand }>{ this.state.hidden ? '▾' : '▴'}</span>
      </div>
      <div className='more-options' style={ this.state.hidden ? style.hidden : style.expando }>
        <SearchRefiner updateOptions={ this.updateOptions } reference={ colorOptions } />
      </div>
      </div>
    );
  }
}

const style = {
  ul: {
    display: 'inline-block',
  },
  span: {
    width: '100px',
    textAlign: 'left',
  },
  expando: {
    display: 'block',
    padding: '5px 5px 5px 50px',
    margin: '0 0 5px 0',
    backgroundColor: '#666',
    border: '1px solid #222',
    boxShadow: 'inset 0 0 3px #222',
    fontSize: '16px',
  },
  hidden: {
    display: 'none',
  },
  li: {
    display: 'block',
    float: 'left',
    padding: '0 11px 0 0',
  },
  li2: {
    display: 'block',
    float: 'left',
    padding: '5px 11px 0 0',
  },
}
