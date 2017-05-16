import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import Results from './components/resultsPane';
import Search from './components/searchPane';
import Deck from './components/deckPane';
import Modal from './components/modalPane';
import Spinner from './components/spinner';
import fetchAllSets from './utils/SetFetcher';
// import * as CardData from './utils/AllCards';
// import * as SetData from './utils/AllSets';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: { search: true, results: true, deck: false, },
      cards: [],
      filters: {},
      sort: 'name',
      sortDir: 'ASC',
      deck: [],
      deckName: '',
      modal: { show: false, children: [], },
      pending: true,
    }
  }

  // STARTUP
  componentDidMount() {
    let self = this;
    fetchAllSets().then(AllSets => {
      const AllCards = self.buildAllCards(AllSets);
      const dummy = { name: '', type: '', text: '', colors: [], cmc: 0, rarities: [], };
      const cards = Object.values(AllCards).filter(c => c.name).map(c => Object.assign({}, dummy, c));
      self.setState({ cards, pending: false });
    });
  }

  buildAllCards = (AllSets) => {
    let AllCards = {};
    AllSets.forEach(set => {
      const { code, cards, type, releaseDate, magicCardsInfoCode } = set;
      cards.forEach(c => {
        AllCards[c.name] = AllCards[c.name] || c;
        AllCards[c.name].sets = AllCards[c.name].sets || [];
        AllCards[c.name].sets.push(code);
        // rarities
        AllCards[c.name].rarities = AllCards[c.name].rarities || [];
        if (type === 'core' || type === 'expansion') {
          AllCards[c.name].rarities.push(c.rarity); // only include rarity values from format-legal sets.
          if (c.rarity === "Basic Land") { AllCards[c.name].rarities.push("Common"); } // treat basics as common
        }
        // formats & legality
        AllCards[c.name].formats = AllCards[c.name].formats || {};
        AllCards[c.name].formats = this.calculateFormats(c, type, releaseDate, AllCards[c.name].formats);
        // printings, artists, & flavor text
        AllCards[c.name].printings = AllCards[c.name].printings || [];
        AllCards[c.name].printings.push({
          set: code,
          artist: c.artist,
          flavor: c.flavor,
          mciSetCode: magicCardsInfoCode,
          mciNumber: c.mciNumber || c.number,
          multiverseId: c.multiverseid,
          rarity: c.rarity,
        });
      });
    });
    return AllCards;
  }

  calculateFormats = (card, setType, releaseDate, oldFormats) => {
    const vintage = oldFormats.vintage || ['core', 'expansion'].includes(setType);
    const legacy = oldFormats.legacy || vintage;
    const modern = oldFormats.modern || (['core', 'expansion'].includes(setType) && new Date(releaseDate) >= new Date('2003-08-27'));
    const standard = oldFormats.standard || (['core', 'expansion'].includes(setType) && new Date(releaseDate) >= new Date('2015-09-27'));
    const commander = oldFormats.commander || vintage || setType === "commander";

    return { standard, modern, legacy, vintage, commander };
  }

  getChildContext() {
    const self = this;
    return {
      updateDeckName: self.updateDeckName,
      deckName: self.state.deckName,
      showModal: self.showModal,
    }
  }

  // DISPLAY AND LAYOUT
  toggleShow = (pane) => {
    let { search, results, deck } = this.state.show;
    switch (pane) {
      case 'SEARCH':  search  = !search;  this.setState({ show: { search, results, deck }}); break;
      case 'DECK':    deck    = !deck;    this.setState({ show: { search, results, deck }}); break;
      case 'RESULTS': results = !results; this.setState({ show: { search, results, deck }}); break;
      default: this.setState({ show: { search: true, results: true, deck: true }});
    }
  }

  // FILTERS AND SORTS
  applyFilters = (cards) => {
    const { filters } = this.state;
    const self = this;
    let filteredCards = cards;
    const results = Object.keys(filters).reduce((filteredCards, filterName) => {
      if ( self.state.filters[filterName] ) {
        return filteredCards.filter(self.state.filters[filterName]);
      } else {
        return filteredCards;
      }
    }, filteredCards);

    return results;
  }

  applySorts = (cards) => {
    const { sort, sortDir } = this.state;
    const dir = sortDir === 'ASC' ? 1 : -1;
    const intParser = (a, b) => {
      const x = isNaN(parseInt(a[sort])) ? -10 : parseInt(a[sort]);
      const y = isNaN(parseInt(b[sort])) ? -10 : parseInt(b[sort]);
      return  x < y ? -dir : dir;
    };
    // default to alphabetical sort, remove cards without the desired attribute
    let preSort = cards.sort((a, b) => a.name < b.name ? -1 : 1).filter(a => a[sort] !== undefined);
    let results;
    switch (sort) {
      case 'power': results = preSort.sort(intParser); break;
      case 'toughness': results = preSort.sort(intParser); break;
      default: results = preSort.sort((a, b) => a[sort] < b[sort] ? -dir : dir); break;
    }
    return results;
  }

  updateFilters = (filters) => this.setState({ filters })
  updateSorts = ({ sort, sortDir }) => this.setState({ sort, sortDir })

  //DECK ACTIONS
  addToDeck = (card) => {
    const deck = this.state.deck.concat([Object.assign({}, card)]);
    this.setState({ deck });
  }

  removeFromDeck = (data) => {
    const card = this.state.deck.find(c => c.name === data.name);
    const newCards = this.state.deck.filter(c => c !== card);
    this.setState({ deck: newCards });
  }

  saveDeck = () => {
    const { deckName } = this.state;
    if ( deckName ) {
      const Scry61 = window.localStorage;
      const deck = JSON.stringify(this.state.deck);
      Scry61.setItem(deckName, deck);
    } else {
      alert('please name your deck');
    }
  }

  loadDeck = () => {
    const deckNames = Object.keys(window.localStorage);
    const buttons = deckNames.map((name, i) => {
      return (
        <li key={i} className='hover-highlighter' onClick={() => this.importDeck(name)} style={buttonStyle}>
          { name }
        </li>
      );
    });
    const children = (
      <ul>{ buttons || 'No Saved Decks' }</ul>
    );
    this.setState({ modal: { show: true, children }});
  }

  importDeck = (name) => {
    const deckString = window.localStorage[name];
    const deckName = name;
    const deck = JSON.parse(deckString);
    this.setState({ deck, deckName });
    this.hideModal();
  }

  showModal = (children = []) => {
    this.setState({ modal: { show: true, children }});
  }

  hideModal = () => {
    this.setState({ modal: { show: false, children: [] }});
  }

  updateDeckName = (e) => {
    e.preventDefault();
    const deckName = e.target.value;
    this.setState({ deckName });
  }

  render() {
    const { cards, filters, deck, deckName, modal, show, sort, sortDir, pending } = this.state;
    const filteredCards = this.applyFilters(cards);
    const sortedCards = this.applySorts(filteredCards);
    const results = (
      <Results
        show={ show }
        addToDeck={ this.addToDeck }
        removeFromDeck={ this.removeFromDeck }
        updateSorts={ this.updateSorts }
        sort={ sort }
        sortDir={ sortDir }
        cards={ sortedCards }
      />
    )
    const spinner = <Spinner />;

    return (
      <div className="App">
        <div className="App-header">
          Scry61
        </div>
        <div className="App-intro">
          <Search
            toggleShow={ this.toggleShow }
            displayed={ show.search }
            updateFilters={ this.updateFilters }
            filters={ filters }
          />
          { pending ? spinner : results }
          <Deck
            toggleShow={ this.toggleShow }
            displayed={ show.deck }
            loadDeck={ this.loadDeck }
            saveDeck={ this.saveDeck }
            addToDeck={ this.addToDeck }
            removeFromDeck={ this.removeFromDeck }
            cards={ deck }
          />
        </div>
        <div className={ modal.show ? 'modal-region' : 'hidden' }>
          <Modal hideModal={ this.hideModal }>
            { modal.children }
          </Modal>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  updateDeckName: React.PropTypes.func,
  deckName: React.PropTypes.string,
  showModal: React.PropTypes.func,
};

const buttonStyle = {
  borderRadius: '3px',
  backgroundColor: '#333',
  color: '#ddd',
  margin: '2px',
  textAlign: 'center',
  lineHeight: '21px',
};

export default App;
