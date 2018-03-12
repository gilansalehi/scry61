import React, { Component } from 'react';
import ManaSymbol from './manaSymbol';
import Button from './button';

export default class CardHead extends Component {

  parseCost = () => {
    const { manaCost } = this.props.data;
    if ( manaCost ) {
      const costArr = manaCost.slice(1, -1).split('}{');
      return costArr.map((c, i) => <ManaSymbol key={i} symbol={c} />);
    } else {
      return [''];
    }
  }

  render() {
    const { data: { name, type, text, power, toughness, colors }} = this.props;
    const pt = power !== undefined && toughness !== undefined ? [power, toughness].join('/') : '';
    const manaCost = this.parseCost().reverse();
    const style = Object.assign({}, cardStyle, this.props.cardStyle);

    return (
      <div key={name} style={ style.border } className='card-border clearfix'>
        <div className='card-header clearfix'   style={style.header}>
          <span className='card-title'     style={style.title}   >{name}</span>&nbsp;
          <span className='card-mana-cost' style={style.manaCost}>{manaCost}</span>
        </div>
      </div>
    );
  }
}

const cardStyle = {
  border: { display: 'inline-block', width: '350px' },
  header: { width: '100%', height: '24px', boxSizing: 'border-box' },
  title: { fontWeight: 'bold', lineHeight: '24px', float: 'left' },
  manaCost: {
    float: 'right',
    width: '75px',
    textAlign: 'left',
    direction: 'rtl',
    whitespace: 'nowrap',
    overflowX: 'visbile'
  },
  actions: { float: 'right', },
  body: {
    borderTop: '1px solid black',
    padding: '5px',
  },
};
