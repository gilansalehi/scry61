import React, {Component} from 'react';
import CardInspector from './cardInspector';

export default class CardImage extends Component {

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
      case 'pPRE': return 'ptc';
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

  calculateImagePath = (card, printing) => {
    const hyphenize = name => name.toLowerCase().replace(/(,|\?)/g, '').replace(/([^a-z])/g, '-');
    if ( card.type === 'Scheme' ) {
      const schemeName = hyphenize(card.name);
      return `http://magiccards.info/extras/scheme/archenemy/${schemeName}.jpg`
    } else if ( card.types[0] === 'Plane' ) {
      const planeName = hyphenize(card.name);
      return `http://magiccards.info/extras/plane/planechase/${planeName}.jpg`
    } else if ( printing.mciNumber ) {
      if ( printing.set === 'pPRE' ) { return cardBackImagePath; }
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
    const {card, printing} = this.props;
    const imageUrl = this.calculateImagePath(card, printing);
    const cardInspector = <CardInspector card={card} imageUrl={imageUrl} key={1} />;
    this.context.showModal([cardInspector]);
  }

  render() {
    const { card, printing } = this.props;
    let sourcePath = this.calculateImagePath(card, printing);

    return (
      <img className='card-image'
        onClick={this.openCardInspector}
        src={sourcePath}
        style={imgStyle}
        alt={sourcePath}
      />
    )
  }
}

CardImage.contextTypes = {
  showModal: React.PropTypes.func,
}

const imgStyle = {
  display: 'inline-block',
  width: '150px',
  height: '225px',
  margin: '-25px 10px -5px 0',
  border: '5px solid #222',
}

const cardBackImagePath = 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/0/07/Cardback_yellow.jpg?version=01d65cd077a35e9b245ad2a23c99b05e'
