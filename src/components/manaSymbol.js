import React, {Component} from 'react';

export default class ManaSymbol extends Component {
  constructor() {
    super();
    this.paths = (symbol) => {
      switch (symbol) {
        case 'W': return 'assets/W.svg';
        case 'U': return 'assets/U.svg';
        case 'B': return 'assets/B.svg';
        case 'R': return 'assets/R.svg';
        case 'G': return 'assets/G.svg';
        case 'C': return 'assets/C.svg'; // colorless mana
        case 'S': return 'assets/S.svg'; // snow mana
        case 'E': return 'assets/E.svg'; // energy symbol
        case 'T': return 'assets/T.svg'; // tap symbol
        case 'Q': return 'assets/Q.svg'; // untap symbol
        case 'X': return 'assets/X.svg';
        case '0': return 'assets/0.svg';
        case '1': return 'assets/1.svg';
        case '2': return 'assets/2.svg';
        case '3': return 'assets/3.svg';
        case '4': return 'assets/4.svg';
        case '5': return 'assets/5.svg';
        case '6': return 'assets/6.svg';
        case '7': return 'assets/7.svg';
        case '8': return 'assets/8.svg';
        case '9': return 'assets/9.svg';
        case '10': return 'assets/10.svg';
        case '11': return 'assets/11.svg';
        case '12': return 'assets/12.svg';
        case '13': return 'assets/13.svg';
        case '14': return 'assets/14.svg';
        case '15': return 'assets/15.svg';
        case '20': return 'assets/20.svg';
        // lorwyn costs
        case '2/W': return 'assets/2W.svg';
        case '2/U': return 'assets/2U.svg';
        case '2/B': return 'assets/2B.svg';
        case '2/R': return 'assets/2R.svg';
        case '2/G': return 'assets/2G.svg';
        // split mana
        case 'W/U': return 'assets/WU.svg';
        case 'W/B': return 'assets/WB.svg';
        case 'U/R': return 'assets/UR.svg';
        case 'U/B': return 'assets/UB.svg';
        case 'B/G': return 'assets/BG.svg';
        case 'B/R': return 'assets/BR.svg';
        case 'R/G': return 'assets/RG.svg';
        case 'R/W': return 'assets/RW.svg';
        case 'G/U': return 'assets/GU.svg';
        case 'G/W': return 'assets/GW.svg';
        case 'W/G': return 'assets/GW.svg';
        // phyrexian mana
        case 'W/P': return 'assets/WP.svg';
        case 'U/P': return 'assets/UP.svg';
        case 'B/P': return 'assets/BP.svg';
        case 'R/P': return 'assets/RP.svg';
        case 'G/P': return 'assets/GP.svg';
        // rarity images
        case 'Common':      return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/48/Black_button.png';
        case 'Uncommon':    return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/16/Silver_button.png';
        case 'Rare':        return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/16/Yellow_button.png';
        case 'Mythic Rare': return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/16/Orange_button.png';
        case 'Special':     return 'https://magidex.com/extstatic/symbol/set/TSP/s.svg';
        // type symbols
        case 'Artifact':      return 'assets/type_artifact.svg';
        case 'Creature':      return 'assets/type_creature.svg';
        case 'Enchantment':   return 'assets/type_enchantment.svg';
        case 'Land':          return 'assets/type_land.svg';
        case 'Instant':       return 'assets/type_instant.svg';
        case 'Planeswalker':  return 'assets/type_planeswalker.svg';
        case 'Sorcery':       return 'assets/type_sorcery.svg';
        default: return false;
      }
    };
  }

  render() {
    if ( this.paths(this.props.symbol) ) {
      return (
        <img src={ this.paths(this.props.symbol) } style={ Object.assign({}, style, this.props.styles) } />
      )
    } else {
      return (<span>{ this.props.symbol }</span>)
    }
  }
}

const style = {
  backgroundColor: 'transparent',
  height: '15px',
  width: '15px',
  margin: '0 0 -2px 0',
}
