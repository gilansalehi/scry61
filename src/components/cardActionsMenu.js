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

  changePrinting(dir) {
    const {setPrinting, printing, card} = this.props;
    const mod = card.printings.length;
    const curr = card.printings.findIndex((which) => which.set === printing.set);
    let nextPrinting = (dir === 'next' ? curr + 1 : curr - 1) % mod;
    if (nextPrinting < 0) nextPrinting += mod;
    setPrinting(card.printings[nextPrinting]);
  }

  render() {
    const { addTo, removeFrom, card, printing } = this.props;
    const swapPrintings = (
      <li>
        <Button handleClick={e => this.changePrinting('prev', card)} text='─' />
        <span onClick={this.noFlip}>Set: {printing.set}</span>
        <Button handleClick={e => this.changePrinting('next', card)} text='+' />
      </li>
    );

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
        { card.printings.length > 1 && swapPrintings }
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