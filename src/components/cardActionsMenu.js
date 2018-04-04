import React, { Component } from 'react';
import Button from './button';
import CardImage from './cardImage';
import mapSetToCode from '../utils/mapSetToCode';

export default class CardActionsMenu extends CardImage {

  noFlip(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  details = () => {
    const { card } = this.props;
    console.log(card);
    this.openCardInspector();
  }

  render() {
    const { addTo, removeFrom, card } = this.props;
    return (
      <ul className='card-actions-list'>
        <li>
          <span className="card-title">{card.name}</span>
        </li>
        <li className="hover-inset hover-hands">
          <span className="card-info" onClick={this.details}>Details</span>
        </li>
        <li>
          <Button handleClick={e => removeFrom('mainboard', card)} text='─' />
          <span onClick={this.noFlip}>Deck</span>
          <Button handleClick={e => addTo('mainboard', card)} text='+' />
        </li>
        <li>
          <Button handleClick={e => removeFrom('sideboard', card)} text='─' />
          <span onClick={this.noFlip}>Sideboard</span>
          <Button handleClick={e => addTo('sideboard', card)} text='+' />
        </li>
        <li className="hover-inset hover-hands">
          <span>Flip Back</span>
        </li>
      </ul>
    );
  }
}

CardActionsMenu.contextTypes = {
  showModal: React.PropTypes.func,
}