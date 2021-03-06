import React, { Component } from 'react';
import CardInspector from './cardInspector';

export default class CardImage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ error: false });
  }

  mapSetToCode = (printing) => {
    switch (printing.set) {
      case '2ED': return '2e'; // 2th Edition
      case '3ED': return '3e'; // 3th Edition
      case '4ED': return '4e'; // 4th Edition
      case '5ED': return '5e'; // 5th Edition
      case '6ED': return '6e'; // 6th Edition
      case '7ED': return '7e'; // 7th Edition
      case '8ED': return '8e'; // 8th Edition
      case '9ED': return '9e'; // 9th Edition
      case '10ED': return '10e'; // 10th Edition
      case 'ALL': return 'ai'; // alliances
      case 'APC': return 'ap'; // apocalypse
      case 'ARN': return 'an'; // arabian nights
      case 'ATQ': return 'aq'; // antiquities
      case 'CEI': return 'cedi'; // international collectors edition
      case 'CSP': return 'cs'; // coldsnap
      case 'DDC': return 'dvd'; // duel decks, divine vs demonic,
      case 'DDE': return 'pvc'; // duel decks, phyrexia vs coaltion
      case 'DD3_DVD': return 'ddadvd'; // duel decks anthology, divine vs demonic
      case 'DD3_EVG': return 'ddaevg'; // duel decks anthology, elves vs goblins
      case 'DST': return 'ds'; // darksteel
      case 'DIS': return 'di'; // dissension
      case 'EXO': return 'ex'; // exodus
      case 'FEM': return 'fe'; // fallen empires
      case 'GPT': return 'gp'; // guildpact
      case 'HML': return 'hl'; // homelands
      case 'ICE': return 'ia'; // ice age
      case 'INV': return 'in'; // invasion
      case 'LEA': return 'al'; // alpha
      case 'LEB': return 'be'; // beta
      case 'LEG': return 'lg'; // legends
      case 'LGN': return 'le'; // legions
      case 'LRW': return 'lw'; // lorwyn
      case 'MIR': return 'mr'; // mirage
      case 'MMQ': return 'mm'; // mercadian masques
      case 'MOR': return 'mt'; // morningtide
      case 'MRD': return 'mi'; // mirrodin
      case 'NMS': return 'ne'; // nemesis
      case 'ODY': return 'od'; // odyssey
      case 'ONS': return 'on'; // onslaught
      case 'PCL': return 'pch'; // planechase
      case 'PCY': return 'pr'; // prophecy
      case 'PLC': return 'pc'; // planar chaos
      case 'PLS': return 'ps'; // planeshift
      case 'POR': return 'po'; // portal
      case 'PTK': return 'p3k'; // portal 3 kingdoms
      case 'S99': return 'st'; // starter set 1999
      case 'SCG': return 'sc'; // scourge
      case 'STH': return 'sh'; // stronghold
      case 'TMP': return 'tp'; // tempest
      case 'TSP': return printing.rarity === 'Special' ? 'tsts' : 'ts'; // time spiral
      case 'TSB': return printing.rarity === 'Special' ? 'tsts' : 'ts'; // also time spiral? timeshifted?
      case 'TOR': return 'tr'; // torment
      case 'UDS': return 'ud'; // urza's destiny
      case 'ULG': return 'ul'; // urza's legacy
      case 'UNG': return 'ug'; // unglued
      case 'UGL': return 'ug'; // also unglued?
      case 'UNH': return 'uh'; // unhinged
      case 'USG': return 'us'; // urza's saga
      case 'VIS': return 'vi'; // visions
      case 'WTH': return 'wl'; // weatherlight
      case 'pCEL': return 'uqc'; // various promos
      case 'pPRE': return 'ptc'; // prerelease promos; img links broken
      case 'pREL': return 'rep'; // release event
      case 'pMEI': return 'mbp';
      case 'pMGD': return 'mgdc'; // magic game day promo
      case 'pFNM': return 'fnmp';
      case 'pPRO': return 'pro';
      case 'CON': return 'cfx'; // conflux
      // planechase => pch
      default: return printing.set.toLowerCase();
    }
  }

  mapVanguardToImgPath = (name) => {
    var pathData = {};
    `ashnod barrin crovax aladamri ertai gerrard greven-il-vec
      hanna hells-caretaker jaya-ballard karn lyna`.split(' ').forEach(c => {
        pathData[c] = `http://magiccards.info/extras/other/vanguard/${c}.jpg`
      });
    `eladamri-lord-of-leaves gix hells-caretaker jaya-ballard-task-mage
      serra-angel maraxus mirri mishra multani oracle orim
      rofellos selenia serra sidar-kondo sisay squee
      sliver-queen-brood-mother starke tahngarth takara tawnos
      titania xantcha urza volrath`.split(' ').forEach(c => {
        pathData[c] = `http://magiccards.info/extras/other/vanguard-mtgo/${c}.jpg`
      });
    return pathData[name] ? pathData[name] : `http://magiccards.info/extras/other/vanguard-mtgo-2/${name}.jpg`;
  }

  calculateImagePath = (card, printing) => {
    const hyphenize = name => name.toLowerCase().replace(/(,|\?)/g, '').replace(/([^a-z])/g, '-');
    if (card.type === 'Scheme' || card.type === 'Ongoing Scheme') {
      const schemeName = hyphenize(card.name);
      if (printing.setName === 'Archenemy: Nicol Bolas') {
        return `http://magiccards.info/extras/scheme/archenemy-nicol-bolas/${schemeName}.jpg`
      }
      return `http://magiccards.info/extras/scheme/archenemy/${schemeName}.jpg`
    } else if (card.types[0] === 'Plane') {
      const planeName = hyphenize(card.name);
      return `http://magiccards.info/extras/plane/planechase-anthology/${planeName}.jpg`
    } else if (card.type === 'Vanguard') {
      const vanguardName = hyphenize(card.name.toLowerCase().replace("'", '').replace(' avatar', ''));
      return this.mapVanguardToImgPath(vanguardName);
    } else if (printing.mciNumber) {
      if (printing.set === 'pPRE') { return cardBackImagePath; }
      const set = printing.mciSetCode || this.mapSetToCode(printing);
      const mci = this.mapStringToMCI(printing.mciNumber);
      return mci !== undefined ? `http://magiccards.info/scans/en/${set}/${mci}.jpg` : cardBackImagePath;
    } else {
      const cardId = printing.multiverseId;
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${cardId}&type=card`;
    }
  }

  mapStringToMCI = (string) => {
    if (string) {
      return string.split('/').reverse()[0];
    }
  }

  openCardInspector = () => {
    const { card, printing } = this.props;
    const imageUrl = this.calculateImagePath(card, printing);
    const cardInspector = <CardInspector card={card} imageUrl={imageUrl} key={1} />;
    this.context.showModal([cardInspector]);
  }

  handleError = () => {
    // maybe try next printing
    this.setState({ error: true });
  }

  loadSuccess = () => {
    // this.setState({ loading: false });
  }

  render() {
    const { loading, error } = this.state;
    const { card, printing } = this.props;
    let sourcePath = error ? cardBackImagePath : this.calculateImagePath(card, printing);

    return (
      <img className='card-image'
        onLoad={this.loadSuccess}
        onError={this.handleError}
        src={sourcePath}
        alt={card.name}
        title={card.name}
      />
    )
  }
}

CardImage.contextTypes = {
  showModal: React.PropTypes.func,
}

const cardBackImagePath = 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg';
