import React, {Component} from 'react';

export default class ManaSymbol extends Component {
  constructor() {
    super();
    this.paths = (symbol) => {
      switch (symbol) {
        case 'W': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/8e/W.svg';
        case 'U': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/9/9f/U.svg';
        case 'B': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/2f/B.svg';
        case 'R': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/87/R.svg';
        case 'G': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/88/G.svg';
        case 'C': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/1/1a/C.svg'; // colorless mana
        case 'S': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/5/56/S.svg'; // snow mana
        case 'T': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/b/be/T.svg'; // tap symbol
        case 'Q': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/2c/Q.svg'; // untap symbol
        case 'X': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/3/3f/X.svg';
        case '0': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/5/53/0.svg';
        case '1': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/9/96/1.svg';
        case '2': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/4/4d/2.svg';
        case '3': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/8c/3.svg';
        case '4': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/b/bf/4.svg';
        case '5': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/9/94/5.svg';
        case '6': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/4/44/6.svg';
        case '7': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/a/a5/7.svg';
        case '8': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/1/12/8.svg';
        case '9': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/1/16/9.svg';
        case '10': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/7/7f/10.svg';
        case '11': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/86/11.svg';
        case '12': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/e/e5/12.svg';
        case '13': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/7/70/13.svg';
        case '14': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/e/e9/14.svg';
        case '15': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/c/cc/15.svg';
        case '20': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/8/82/20.svg';
        // lorwyn costs
        case '2/W': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/b/bb/2W.svg';
        case '2/U': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/a/a5/2U.svg';
        case '2/B': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/5/54/2B.svg';
        case '2/R': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/7/7d/2R.svg';
        case '2/G': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/2f/2G.svg';
        // split mana
        case 'W/U': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/3/39/WU.svg';
        case 'W/B': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/a/a6/WB.svg';
        case 'U/R': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/0/09/UR.svg';
        case 'U/B': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/1/13/UB.svg';
        case 'B/G': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/6/62/BG.svg';
        case 'B/R': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/b/bf/BR.svg';
        case 'R/G': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/24/RG.svg';
        case 'R/W': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/6/6b/RW.svg';
        case 'G/U': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/6/6f/GU.svg';
        case 'G/W': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/2e/GW.svg';
        case 'W/G': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/2/2e/GW.svg';
        // phyrexian mana
        case 'W/P': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/f/fe/WP.svg';
        case 'U/P': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/6/6b/UP.svg';
        case 'B/P': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/4/4f/BP.svg';
        case 'R/P': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/0/0f/RP.svg';
        case 'G/P': return 'https://hydra-media.cursecdn.com/mtg.gamepedia.com/1/17/GP.svg';
        // rarity images
        case 'Common':      return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/48/Black_button.png';
        case 'Uncommon':    return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/16/Silver_button.png';
        case 'Rare':        return 'https://cdn.pixabay.com/photo/2016/05/24/12/04/gold-1412245_960_720.png';
        case 'Mythic Rare': return 'https://cdn4.iconfinder.com/data/icons/free-social-media-icons/16/Orange_button.png';
        case 'Special':     return 'https://magidex.com/extstatic/symbol/set/TSP/s.svg';
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
