import React, { Component } from 'react';
import Button from './button';
import CardImage from './cardImage';

export default class CardActionsMenuSlim extends CardImage {

  noFlip(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  details = () => {
    const { card, printing } = this.props;
    console.log(card);
    this.context.showModal([
      <CardImage card={card} printing={printing} />
    ]);
  }

  render() {
    const { addTo, removeFrom, card } = this.props;
    return (
      <div className="card-actions__slim__container">
        <div className="card-actions__slim__actions">
          <Button handleClick={v => this.details()} text='i' title='details' />
          <Button handleClick={v => addTo('mainboard', v)} value={card} text={'+'} title='add' />
          <Button handleClick={v => removeFrom('mainboard', v)} value={card} text={'─'} title='remove' />
          <Button handleClick={v => addTo('sideboard', v)} value={card} text={'S+'} title='add to sideboard' />
          <Button handleClick={v => removeFrom('sideboard', v)} value={card} text={'S─'} title='remove from sideboard' />
        </div>
      </div>
    );
  }
}

CardActionsMenuSlim.contextTypes = {
  showModal: React.PropTypes.func,
}