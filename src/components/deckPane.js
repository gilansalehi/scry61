import React, { Component } from 'react';
import DeckActions from './deckActions';
import Button from './button';
import CardDisplayer from './cardDisplayer';

export default class Deck extends Component {

  buildDeckObj = (cards) => {
    const cardTypes = 'Artifact Creature Enchantment Instant Land Sorcery Planeswalker Plane Vanguard Scheme'.split(' ');
    let deck = cardTypes.reduce((acc, item) => {
      acc[item] = [];
      return acc;
    }, {});

    cards.forEach((card, i) => {
      cardTypes.some((type, i) => {
        if ( card.types.includes(type) ) { 
          return deck[type].push(card); 
        }

        return false;
      })
    });

    return deck;
  }

  prepareCategory = (location, cards) => {
    const { addTo, removeFrom, moveTo } = this.props;
    const destination = location === 'mainboard' ? 'sideboard' : 'mainboard';
    const byName = (a, b) => a.name < b.name ? -1 : 1;
    const unique = (card, idx, self) => self.findIndex(c => c.name === card.name) === idx;
    return cards
      .sort(byName)
      .filter(unique)
      .map((c, i, self) => {
        return (
          <li key={i + c.name} className='deck-list__item clearfix'>
            <div className="deck-list__item-info">
              <span className="card-count">{ cards.filter(x => x.name === c.name).length }</span>
              <div className="deck-list__item-actions">
                <Button handleClick={v => addTo(location, v)} value={c} text={'+'} title='add' />
                <Button handleClick={v => removeFrom(location, v)} value={c} text={'─'} title='remove' />
                <Button handleClick={v => moveTo(destination, v)} value={c} text={destination[0].toUpperCase()} title={'move to ' + destination} />
              </div>
            </div>
            <CardDisplayer key={c.name}
              view={'COLLAPSED'}
              cardStyle={{border: { width: '100%'}}}
              data={c}
              collapsed={true}
              addTo={addTo}
              removeFrom={removeFrom}
            />
          </li>
        );
      });
  }

  prepareList = (location, cards) => {
    const deckObj = this.buildDeckObj(cards);
    const deckList = Object.keys(deckObj).sort().map(cardType => {
      const cards = deckObj[cardType];
      if ( !cards.length ) { return }; // no cards of the given type

      return (
        <ul key={cardType} className="deck-list__category">
          <li className="deck-list__category-title">
            <span className="card-count">{ cards.length }</span>
            <span>{ cardType }</span>
            <span></span>
          </li>
          { this.prepareCategory(location, cards) }
        </ul>
      );
    })

    return deckList;
  }

  render() {
    const { deck, saveDeck, loadDeck, show } = this.props;

    if ( !show ) { return (<div className="deck-pane hidden"></div>); }

    const decklist = ['mainboard', 'sideboard'].map(board => {
      if ( !deck[board].length ) return;
      return (
        <ul key={board} className={`deck-list__${board}`}>
          <li key={board} className={`deck-list__${board}-title`}>
            { board === 'mainboard' ? 'Main Deck' : 'Sideboard' }
          </li>
          { this.prepareList(board, deck[board]) }
        </ul>
      )
    });

    return (
      <div className='deck-pane'>
        <div className='deck-info' style={infoStyle}>
          <span title='Hide Deck'>
            <Button handleClick={v => this.props.toggleShow(v)} value={'DECK'} text={'>'} styles={{margin:'2px 10px 2px 0'}}/>
          </span>
          <span>{ deck.mainboard.length + deck.sideboard.length } total</span>
          <span>
            <DeckActions saveDeck={ saveDeck } loadDeck={ loadDeck } />
          </span>
        </div>
        { decklist }
      </div>
    )
  }
}

const countStyle = {
  float: 'left',
  padding: '0 5px',
};

const infoStyle = {
  textAlign: 'left',
  padding: '0 5px 10px 5px',
  color: '#ccc',
  fontSize: '18px',
  fontFamily: '"Cinzel", serif',
};

 const resultStyle = {
   listStyle:'none',
   background:'#ccc',
   border:'1px solid black',
   color: 'black',
   fontSize: '16px',
   lineHeight: '24px',
 }

const spacerStyle = {
  listStyle:'none',
  background:'#999',
  border:'1px solid black',
  color: 'black',
  fontSize: '16px',
  lineHeight: '24px',
}

const tipStyle = {
  margin: '100px auto',
  color: 'gray',
  textAlign: 'center',
  fontSize: '14px',
}
