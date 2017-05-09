import React, { Component } from 'react';
import DeckActions from './deckActions';
import Button from './button';
import CardDisplayer from './cardDisplayer';

export default class Deck extends Component {

  buildDeckObj = (cards) => {
    const cardTypes = ['Creature', 'Land', 'Artifact', 'Enchantment', 'Instant', 'Sorcery', 'Planeswalker'];
    let mainDeck = {
      Artifact: [],
      Creature: [],
      Enchantment: [],
      Instant: [],
      Land: [],
      Planeswalker: [],
      Sorcery: [],
      Other: [],
    };

    cards.forEach((card, i) => {
      cardTypes.some((type, i) => {
        if ( card.types.includes(type) ) { return mainDeck[type].push(card); }
        return false;
      })
    });

    return mainDeck;
  }

  prepareCount = (cards) => {
    let count = 1;
    const list = cards.sort((a, b) => a.name < b.name ? 1 : -1).map((card, i) => {
      const nextCard = cards[i + 1];
      if ( nextCard && card.name === nextCard.name ) {
        count += 1;
        return false;
      } else {
        const cardCount = count.toString();
        count = 1;
        return Object.assign({}, card, { cardCount });
      }
    });

    return list.filter(c => c);
  }

  prepareList = (cards) => {
    const { addToDeck, removeFromDeck } = this.props;
    const cardCount  = this.prepareCount(cards);
    const deckObj    = this.buildDeckObj(cardCount);

    const list = Object.keys(deckObj).sort().reduce((decklist, category, i) => {
      if ( deckObj[category].length ) {
        return (decklist.concat([
          <li key={category + '-spacer'} className='spacer' style={spacerStyle}>
            <span style={countStyle}>{deckObj[category].reduce((acc, c) => acc += parseInt(c.cardCount), 0)}</span>
            <span>{ category }</span>
          </li>,
          ...deckObj[category].sort((a, b) => a.name < b.name ? -1 : 1).map((c, i) => {
            return (
              <li key={i + c.name} className='deck-list-item clearfix' style={resultStyle}>
                <CardDisplayer key={c.name}
                  cardStyle={{ border: { width: '300px', display: 'inline-block'} }}
                  cardCount={ c.cardCount }
                  showImage={false}
                  data={c}
                  collapsed={ true }
                  addToDeck={ addToDeck }
                  removeFromDeck={ removeFromDeck }
                />
              </li>
            );
          })
        ])
        )
      } else { return decklist; }
    }, []);

    return list;
  }

  showTips = () => {
    return (
      <li style={tipStyle}>
        Add cards to your deck by clicking <br/>
        the [+] icon on cards in your search <br/>
        results
      </li>
    );
  }

  render() {
    const { cards, saveDeck, loadDeck, displayed } = this.props;
    const list = cards.length ? this.prepareList(cards) : this.showTips();
    const display = displayed ? 'inline-block' : 'none';
    const deckPaneStyle = Object.assign({}, { display });

    if ( !displayed ) {
      return (
        <div className='' style={{display:'inline-block', float:'right', padding: '10px'}} title='Show Deck'>
          <Button handleClick={val => this.props.toggleShow(val)} value={'DECK'} text={'<'} />
        </div>
      );
    }

    return (
      <div className='deck-pane' style={deckPaneStyle}>
        <div className='deck-info' style={infoStyle}>
          <span title='Hide Deck'>
            <Button handleClick={v => this.props.toggleShow(v)} value={'DECK'} text={'>'} styles={{margin:'2px 10px 2px 0'}}/>
          </span>
          <span>{ cards.length } total</span>
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
