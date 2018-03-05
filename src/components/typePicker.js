
import React, {Component} from 'react';
import Checkbox from './checkbox';
import SearchRefiner from './searchRefiner';
import ManaSymbol from './manaSymbol';
import Debouncer from './debouncer';

export default class TypePicker extends Component {
  constructor(props) {
    super(props)

    this.state = { hidden: true }
  }

  expand = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  handleClick = (type) => {
    this.props.updateTypes(type);
  }

  updateOptions = (value) => {
    this.props.updateOptions(value);
  }

  render() {
    const { types, typeOptions, refCallback, inputValue, changed } = this.props;

    const boxOptions = 'Artifact Creature Enchantment Land Instant Planeswalker Sorcery'.split(' ');
    const boxes = boxOptions.map((opt, i) => {
      return (
        <li style={style.li} key={opt} title={opt}>
          <Checkbox
            checked={ types.includes(opt)}
            handleClick={(opt) => this.handleClick(opt)}
            symbol={opt}
            value={opt}
          />
        </li>
      );
    });

    return (
      <div className='type-picker'>
        <div className='main-options'>
          <label className='search-label'>
            <span style={style.span}>Type:</span>
            <Debouncer ref={ refCallback }
              value={ inputValue }
              changed={ changed }
              style={style.input}
            />
          </label>
          <span className='expando hover-hands' style={{ margin: '0 0 0 9px' }} onClick={this.expand}>{this.state.hidden ? '▾' : '▴'}</span>
        </div>
        <div className='more-options' style={ this.state.hidden ? style.hidden : style.expando }>
          <ul className='types' style={style.ul}>
            {boxes}
          </ul>
          <ul style={style.ul}>
            <SearchRefiner updateOptions={ this.updateOptions } reference={ typeOptions } />
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
    backgroundtype: '#666',
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
  input: {
    border: '3px solid black',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    padding: '3px',
    color: '#eee',
    width: '164px',
  },
}
