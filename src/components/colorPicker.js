import React, {Component} from 'react';
import Checkbox from './checkbox';
import ManaSymbol from './manaSymbol';

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
    const {colors, colorOptions} = this.props;
    return (
      <div>
      <label>
        <span style={style.span}>Color:</span>
        <ul className='colors' style={style.ul}>
          <li style={style.li}><Checkbox value={colors.includes('White')} handleClick={ (color) => this.handleClick(color) } colorCode='W' color='White'/></li>
          <li style={style.li}><Checkbox value={colors.includes('Blue')}  handleClick={ (color) => this.handleClick(color) } colorCode='U' color='Blue' /></li>
          <li style={style.li}><Checkbox value={colors.includes('Black')} handleClick={ (color) => this.handleClick(color) } colorCode='B' color='Black'/></li>
          <li style={style.li}><Checkbox value={colors.includes('Red')}   handleClick={ (color) => this.handleClick(color) } colorCode='R' color='Red'  /></li>
          <li style={style.li}><Checkbox value={colors.includes('Green')} handleClick={ (color) => this.handleClick(color) } colorCode='G' color='Green'/></li>
        </ul>
        <span className='expando hover-hands' onClick={ this.expand }>{ this.state.hidden ? '▾' : '▴'}</span>
      </label>
      <div className='more-options' style={ this.state.hidden ? style.hidden : style.expando }>
        <ul style={style.ul}>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'AND' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='AND'
              colorCode={ colorOptions === 'AND' ? '✔' : '-' }
            />
            <span> AND</span>
          </li>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'OR' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='OR'
              colorCode={ colorOptions === 'OR' ? '✔' : '-' }
            />
            <span> OR</span>
          </li>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'NOT' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='NOT'
              colorCode={ colorOptions === 'NOT' ? '✔' : '-' }
            />
            <span> NOT</span>
          </li>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'EXACTLY' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='EXACTLY'
              colorCode={ colorOptions === 'EXACTLY' ? '✔' : '-' }
            />
            <span> EXACTLY</span>
          </li>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'ONLY' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='ONLY'
              colorCode={ colorOptions === 'ONLY' ? '✔' : '-' }
            />
            <span> ONLY</span>
          </li>
          <li style={style.li2}>
            <Checkbox value={ colorOptions === 'EXCLUDE_UNSELECTED' }
              handleClick={ (opt) => this.updateOptions(opt) }
              color='EXCLUDE_UNSELECTED'
              colorCode={ colorOptions === 'EXCLUDE_UNSELECTED' ? '✔' : '-' }
            />
            <span> EXCLUDE UNSELECTED</span>
          </li>
        </ul>
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
