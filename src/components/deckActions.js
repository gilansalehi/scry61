import React, { Component, PropTypes } from 'react';
import Button from './button';

export default class DeckActions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    };
  }

  toggleView = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  hideMenu = () => {
    this.setState({ expanded: false });
  }

  saveDeck = () => {
    this.props.saveDeck(this.state.deckName);
    this.hideMenu();
  }

  loadDeck = () => {
    this.props.loadDeck();
    this.hideMenu();
  }

  updateDeckName = (e) => {
    this.context.updateDeckName(e);
  }

  render() {
    const {saveDeck, loadDeck} = this.props;
    const {expanded, deckName} = this.state;

    return (
      <div className='deck-actions' style={actionStyle}>
        <input value={this.context.deckName} onChange={e => this.updateDeckName(e)} placeholder='Name Your Deck'/>
        <Button handleClick={() => this.toggleView()} text='⋮' styles={buttonStyleOverride}/>

        <div className={ expanded ? 'dropdown-hider' : 'hidden' } onClick={this.hideMenu}></div>
        <ul className={ expanded ? 'dropdown clearfix' : 'hidden' } style={ulStyle}>
          <li onClick={ e => this.saveDeck() }>Save</li>
          <li onClick={ e => this.loadDeck() }>Load</li>
        </ul>
      </div>
    );
  }
}

DeckActions.contextTypes = {
  updateDeckName: React.PropTypes.func,
  deckName: React.PropTypes.string,
}

const actionStyle={
  display: 'inline-block',
  float: 'right',
  position:'relative',
};

const ulStyle = {
  position: 'absolute',
  width: '200px',
  textAlign:'center',
  right: 0,
}

const buttonStyleOverride={
  height: '22px',
  width: '20px',
  borderRadius: 0,
  borderBottomRightRadius: '3px',
  borderTopRightRadius: '3px',
  margin: 0,
  textAlign: 'center',
  lineHeight: '19px',
}
