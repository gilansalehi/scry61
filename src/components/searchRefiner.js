import React, { Component } from 'react';
import Checkbox from './checkbox';
import ManaSymbol from './manaSymbol';

export default class SearchRefiner extends Component {
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
    const { reference } = this.props;
    const options = 'AND OR NOT EXACTLY ONLY EXCLUDE_UNSELECTED'.split(' ');
    const listItems = options.map(opt => {
      return (
        <li key={ opt } style={style.li2}>
          <Checkbox checked={ reference === opt }
            handleClick={ (opt) => this.updateOptions(opt) }
            value={ opt }
            symbol={ reference === opt ? '✔' : '-' }
          />
          <span> { opt.split('_').join(' ') }</span>
        </li>
      )
    })
    return (
      <ul style={style.ul}>
        { listItems }
      </ul>
    );
  }
}

const style = {
  ul: {
    display: 'inline-block',
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
