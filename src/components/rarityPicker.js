import React, {Component} from 'react';
import Checkbox from './checkbox';
import ManaSymbol from './manaSymbol';

export default class RarityPicker extends Component {
  constructor(props) {
    super(props)

    this.state = { hidden: true }
  }

  expand = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  updateOptions = (value) => {
    this.props.updateOptions(value);
  }

  render() {
    const {current, options} = this.props;
    const boxOptions = ['Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Special'];
    const boxes = boxOptions.map((opt, i) => {
      return (
        <li style={style.li} key={i} title={opt}>
          <Checkbox value={current.includes(opt)}
            handleClick={ (opt) => this.props.handleClick(opt) }
            colorCode={ opt }
            color={ opt }
          />
        </li>
      );
    });

    const advancedOptions = ['AND', 'OR', 'NOT', 'EXACTLY', 'ONLY', 'EXCLUDE UNSELECTED'];
    const advancedBoxes = advancedOptions.map((opt, i) => {
      return (
        <li style={style.li2} key={i}>
          <Checkbox value={ options === opt }
            handleClick={ (opt) => this.props.updateOptions(opt) }
            color={ opt }
            colorCode={ options === opt ? '✔' : '-' }
          />
          <span>{ ' ' + opt }</span>
        </li>
      )
    });

    return (
      <div>
        <label>
          <span style={style.span}>Rarity:</span>
          <ul className='colors' style={style.ul}>
            { boxes }
          </ul>
          <span className='expando hover-hands' onClick={ this.expand }>{ this.state.hidden ? '▾' : '▴'}</span>
        </label>
        <div className='more-options' style={ this.state.hidden ? style.hidden : style.expando }>
          <ul style={style.ul}>
            { advancedBoxes }
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
