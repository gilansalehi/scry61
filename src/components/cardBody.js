import React, { Component } from 'react';
import ManaSymbol from './manaSymbol';
import SetPicker from './setPicker';
import Button from './button';

export default class CardBody extends Component {
  constructor(props) {
    super(props);

    const { printings } = this.props.data;
    this.state = {
      printing: printings[0],
      showSetPicker: false,
    };
  }

  parseSymbols = (text) => {
    if ( text ) {
      return text.split('\n').map(block => {
        const blocks = block.split(/{|}/g).map((t, i) => {
          return i % 2 ? <ManaSymbol key={i} symbol={t} /> : <span key={i}>{t}</span>;
        })
        return [...blocks, <br/>];
      });
    } else {
      return '';
    }
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

  setPrinting = (p) => {
    this.setState({ showSetPicker: false });
    this.props.setPrinting(p);
  }

  showPicker = () => {
    this.setState({ showSetPicker: true });
  }
  hidePicker = () => {
    this.setState({ showSetPicker: false });
  }

  render() {
    const { data: { name, type, text, power, toughness, colors, sets, printings, loyalty }, printing } = this.props;
    const { showSetPicker } = this.state;
    const pt = power !== undefined && toughness !== undefined ? [power, toughness].join('/') : loyalty || '';
    const style = Object.assign({}, cardStyle, this.props.cardStyle);
    const decoratedText = this.parseSymbols(text);
    const setPicker = <SetPicker card={this.props.data} setPrinting={this.setPrinting} hide={this.hidePicker}/>;
    const setStyle = Object.assign({}, cardStyle.set, { color: this.mapRarityToColor(printing.rarity) });

    return (
      <div className='card-body clearfix' style={style.body}>
        <div className='card-divider'>
          <div className='card-types' style={{display:'inline-block', textAlign:'center'}}>{ type }</div>
          <div className='card-set hover-hands' style={setStyle} onClick={this.showPicker}>
            <span>{ printing.set }</span>
            { showSetPicker && setPicker }
          </div>
        </div>
        <div className='card-text' style={{textAlign:'left', padding:'5px'}}>{ decoratedText }</div>
        <div className='card-flavor' style={{textAlign:'center', padding:'5px', fontStyle:'italic'}}>{ printing.flavor }</div>
        <div className='card-foooter' style={{textAlign:'right', padding: '5px'}}>{ pt }</div>
      </div>
    );
  }
}

const cardStyle = {
  border: { display: 'inline-block', width: '400px' },
  header: { width: '400px' },
  title: { fontWeight: 'bold',  },
  manaCost: {  },
  actions: { float: 'right', },
  body: {
    borderTop: '1px solid black',
  },
  image: {
    display: 'inline-block',
    float: 'left',
  },
  set: {
    display: 'inline-block',
    float: 'right',
    position: 'relative',
    padding: '0 5px',
    fontWeight: 'bold',
  },
};
