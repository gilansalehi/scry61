import React, {Component} from 'react';

export default class SetPicker extends Component {

  setPrinting = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.setPrinting(p)
  }

  hideDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.hide();
  }

  mapRarityToColor = (rarity) => {
    switch (rarity) {
      case 'Common':      return 'black';
      case 'Uncommon':    return '#99aabc';
      case 'Rare':        return 'gold';
      case 'Mythic Rare': return 'orangered';
      case 'Special':     return 'mediumpurple';
      default: return 'black';
    }
  }

  prepareList = (printings) => {
    return printings.map((p, i) => {
      return (
        <li key={i} className='hover-hands hover-highlighter' onClick={e => this.setPrinting(e, p)}>
          <span style={{color: this.mapRarityToColor(p.rarity)}}>{p.set}</span>
        </li>
      );
    })
  }

  render() {
    const { card } = this.props;
    const printings = card.printings;
    const list = this.prepareList(printings);
    return (
      <div className='set-picker'>
        <div className='dropdown-hider' onClick={e => this.hideDropdown(e)}></div>
        <ul className='dropdown'>
          { list }
        </ul>
      </div>
    )
  }
}
