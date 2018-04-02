import React, { Component } from 'react';
import DeckActions from './deckActions';
import Button from './button';
import CardDisplayer from './cardDisplayer';

export default class Deck extends Component {

  buildDeckObj = (cards) => {
    const cardTypes = 'Artifact Creature Enchantment Instant Land Sorcery Planeswalker'.split(' ');
    let mainDeck = cardTypes.reduce((acc, item) => { 
      acc[item] = []; 
      return acc; 
    }, {});

    cards.forEach((card, i) => {
      cardTypes.some((type, i) => {
        if ( card.types.includes(type) ) { return mainDeck[type].push(card); }
        return false;
      })
    });

    return mainDeck;
  }

  prepareCategory = (cards) => {
    const { addToDeck, removeFromDeck, addToSideboard, removeFromSideboard } = this.props;
    const byName = (a, b) => a.name < b.name ? -1 : 1;
    const unique = (card, idx, self) => self.findIndex(c => c.name === card.name) === idx; // returns true if card is first instance with given name in array
    return cards
      .sort(byName)
      .filter(unique)
      .map((c, i, self) => {
        return (
          <li key={i + c.name} className='deck-list__item clearfix'>
            <span className="card-count">{ cards.filter(x => x.name === c.name).length }</span>
            <CardDisplayer key={c.name}
              view={'COLLAPSED'}
              data={c}
              collapsed={true}
              addToDeck={addToDeck}
              removeFromDeck={removeFromDeck}
              addToSideboard={addToSideboard}
              removeFromSideboard={removeFromSideboard}
            />
          </li>
        );
      });
  }

  prepareList = (cards) => {
    const { addToDeck, removeFromDeck, addToSideboard, removeFromSideboard } = this.props;
    const deckObj    = this.buildDeckObj(cards);

    const deckList = Object.keys(deckObj).sort().map(cardType => {
      if ( !deckObj[cardType].length ) { return }; // no cards of the given type

      return (
        <ul key={cardType} className="deck-list__category">
          <li className="deck-list__category-title">{ cardType }</li>
          { this.prepareCategory(deckObj[cardType]) }
        </ul>
      );
    })

    return deckList;
  }

  showTips = () => {
    return (
      <li style={tipStyle}>
        Add cards to your deck by clicking <br/>
        the [+] icon on cards in your search <br/>
        results.  Collapse this pane to <br/>
        show card images in search results.
      </li>
    );
  }

  render() {
    const { deck, saveDeck, loadDeck, show } = this.props;

    if ( !show ) { return (<div className="deck-pane hidden"></div>); }

    const { mainboard, sideboard } = deck;
    const list = mainboard.length ? this.prepareList(mainboard) : this.showTips();

    return (
      <div className='deck-pane'>
        <div className='deck-info' style={infoStyle}>
          <span title='Hide Deck'>
            <Button handleClick={v => this.props.toggleShow(v)} value={'DECK'} text={'>'} styles={{margin:'2px 10px 2px 0'}}/>
          </span>
          <span>{ mainboard.length + sideboard.length } total</span>
          <span>
            <DeckActions saveDeck={ saveDeck } loadDeck={ loadDeck } />
          </span>
        </div>
        <ul>
          { list }
        </ul>
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
