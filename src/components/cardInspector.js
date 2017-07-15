import React, { Component } from 'react';
import CardHeader from './cardHead';
import CardBody from './cardBody';
import ManaSymbol from './manaSymbol';
import mapSetToCode from '../utils/mapSetToCode';

export default class CardInspector extends Component {
  constructor(props) {
    super(props);

    const { card, printing } = this.props;

    this.state = {
      view: 'STANDARD',
      printing: printing || card.printings[0],
    };
  }

  parseCost = (manaCost) => {
    if ( manaCost ) {
      const costArr = manaCost.slice(1, -1).split('}{');
      return costArr.map((c, i) => <ManaSymbol key={i} symbol={c} />);
    } else {
      return [''];
    }
  }

  parseSymbols = (text) => {
    if ( text ) {
      return text.split('\n').map(block => {
        const blocks = block.split(/{|}/g).map((t, i) => {
          return i % 2 ? <ManaSymbol key={i} symbol={t} styles={{height: '12px', width: '12px'}} /> : <span key={i}>{t}</span>;
        })
        return [...blocks, <br/>];
      });
    } else {
      return '';
    }
  }

  colorFixer = () => {
    return false;
  }

  prepareStandardView = (card) => {
    const color = card.colors[0].toLowerCase() || 'colorless';
    const manaCost = this.parseCost(card.manaCost);
    const c = colors[color];
    return (
      <div key={1} className='canvas' style={{width: '312px', height: '445px', backgroundImage: `url(${this.props.imageUrl})`}}>
        <div className='inspector-frame' style={Object.assign({}, styles.base, {border: '4px solid black'})}>
          <div className='inspector-border' style={Object.assign({}, styles.base, {border: '11px solid ' + c.background, borderBottom: '28px solid ' + c.background})}>
            <div className='inspector-lining' style={Object.assign({}, styles.base, styles.shadow, {border: '2px solid ' + c.lining})}>
              <div className='inspector-header-container' style={Object.assign({}, styles.base, {height: '28px'})}>
                <div className='inspector-header' style={Object.assign({}, styles.standard.header, {background: c.textbox, border: '4px solid ' + c.lining})}>
                  <span style={styles.standard.title}>{ card.name }</span>
                  <span style={{float:'right', padding:'5px 10px'}}>{ manaCost }</span>
                </div>
              </div>
              <div className='inspector-art' style={ Object.assign({}, styles.base, styles.insetShadow, {height: '200px', border: '2px solid ' +c.lining}) }>
              </div>
              <div className='inspector-divider-container' style={ Object.assign({}, styles.base, styles.insetShadow, {height: '28px', background: c.textbox, border: '2px solid ' + c.lining})}>
                <div className='inspect-divider' style={Object.assign({}, styles.standard.header, {background: c.textbox, border: '4px solid ' + c.lining, height:'26px', zIndex: 1})}>
                  <span style={styles.standard.text}>{ card.type }</span>
                </div>
              </div>
              <div className='inspector-textbox' style={Object.assign({}, styles.base, styles.insetShadow, {height: '140px', background: c.textbox, border: '2px solid ' + c.lining})}>
                <span style={styles.standard.text}>{ this.parseSymbols(card.text) }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  prepareHtml = (card, view) => {
    switch (view) {
      case 'STANDARD': return this.prepareStandardView(card); break;
      default: return this.prepareStandardView(card); break;
    }
  }

  prepareCanvas = () => {
    const {imageUrl} = this.props;
    return (
      <div key={1} className='canvas'
        style={{
          width: '312px',
          height: '445px',
          margin: 'auto',
          backgroundImage: `url(${imageUrl})`
        }}
      >
      </div>
    );
  }

  extractPriceInfo = () => {
    const priceTable = document.getElementById('iframe1').contentWindow.document.getElementById('TCGPHiLoTable');
    this.setState({ priceTable })
  }

  render() {
    const { card } = this.props;
    const { view, printing } = this.state;
    const { mciSetCode, mciNumber } = printing;
    const set = mciSetCode || mapSetToCode(printing);
    const iframeUrl = `http://magiccards.info/${set}/en/${mciNumber}.html`;
    // const canvas = this.prepareCanvas();
    return (
      <div className='card-inspector clearfix'>
        <div className='card-inspector-actions'></div>
        <div className='card-inspector-display' style={{margin:'auto'}}></div>
        <iframe id='iframe1' src={iframeUrl} width='100%' height='800px'>
        </iframe>
      </div>
    )
  }
}

const styles = {
  base: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: '"Cambria", serif',
    fontSize: '15px',
    // borderStyle:'groove',
    // borderRadius: '2px',
    position: 'relative',
  },
  shadow: { boxShadow: '0 0 5px black' },
  insetShadow: { boxShadow: 'inset 0 0 5px black' },
  standard: {
    title: {fontFamily:'"Cambria", serif', float: 'left', padding:'3px', fontWeight:'bold', fontSize: '17px' },
    text: {fontFamily:'"Cambria", serif', float: 'left', padding:'5px', fontWeight:'normal', fontSize: '14px', textAlign: 'left'},
    header: {
      position: 'absolute',
      width: '282px',
      left: '50%',
      top: '-4px',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '2px',
      zIndex: 1,
    }
  }
};

const colors = {
  white: { border: '', background: '', highlight: '' },
  blue:  { border: '', background: '', highlight: '' },
  black: { border: '', background: '', highlight: '' },
  red:   { textbox: '#FFC29E', background: 'maroon', lining: 'coral' },
  green: { border: '', background: '', highlight: '' },
  colorless: { border: '', background: '', highlight: '' },
};
