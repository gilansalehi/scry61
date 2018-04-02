import React, { Component } from 'react';
import Button from './button';

export default class CardActionsMenu extends Component {

  noFlip(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { removeFromDeck, addToDeck, data } = this.props;
    return (
      <ul className='card-actions-list'>
        <li>
          <span className="card-title">{ data.name }</span>
        </li>
        <li>
          <Button handleClick={e => removeFromDeck()} text='─' />
          <span onClick={this.noFlip}>Deck</span>
          <Button handleClick={e => addToDeck()} text='+' />
        </li>
        <li>
          <Button handleClick={e => removeFromDeck()} text='─' />
          <span onClick={this.noFlip}>Sideboard</span>
          <Button handleClick={e => addToDeck()} text='+' />
        </li>
        <li className="hover-inset hover-hands">
          <span>Flip Back</span>
        </li>
      </ul>

    );
  }
}
