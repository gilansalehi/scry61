import React, { Component } from 'react';
import ManaSymbol from './manaSymbol';
import Button from './button';

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  parseCost = () => {
    const { manaCost } = this.props.data;
    if ( manaCost ) {
      const costArr = manaCost.slice(1, -1).split('}{');
      return costArr.map((c, i) => <ManaSymbol key={i} symbol={c} />);
    } else {
      return '';
    }
  }

  render() {
    const { location, expanded, data: { name, type, text, power, toughness, colors }} = this.props;
    const pt = power !== undefined && toughness !== undefined ? [power, toughness].join('/') : '';
    const manaCost = this.parseCost();
    const style = Object.assign({}, cardStyle, this.props.cardStyle);

    const cardBody = () => {
      return (
        <div className='card-body clearfix' style={style.body}>
          <div className='card-image'></div>
          <div className='card-divider'>
            <div className='card-types'>{ type }</div>
          </div>
          <div className='card-text'>{ text }</div>
          <div className='card-foooter'>{ pt }</div>
        </div>
      );
    };

    return (
      <div key={name}
        style={ style.border }
        className='card-border clearfix'
      >
        <div className='card-header clearfix'   style={style.header}>
          <span className='card-title'     style={style.title}   >{name}</span>&nbsp;
          <span className='card-mana-cost' style={style.manaCost}>{manaCost}</span>
        </div>
        { expanded && cardBody() }
      </div>
    )
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
    padding: '5px',
  },
};
