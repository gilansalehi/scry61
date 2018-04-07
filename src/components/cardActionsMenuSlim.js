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
    const mobile = window.matchMedia('(max-width: 767px)');
    const isMobile = mobile.matches;
    if (isMobile) {
      this.context.showModal([
        <CardImage card={card} printing={printing} />
      ]);
    } else {
      this.openCardInspector();
    }
  }

  render() {
    const { card, location = 'mainboard' } = this.props;
    const { addTo, removeFrom, moveTo } = this.context;
    const destination = location === 'mainboard' ? 'sideboard' : 'mainboard';
    return (
      <div className="card-actions__slim__container">
        <ul className="card-actions__slim__actions">
          <li className="card-actions__slim__details" >
            <Button
              handleClick={v => this.details()} 
              text='i' title='details' styles={{fontFamily:'monospace'}} 
            />
          </li>
          <li className="card-actions__slim__mainboard--add" >
            <Button
              handleClick={v => addTo('mainboard', v)} 
              value={card} text={'+'} title='add' 
              />
            </li>
          <li className="card-actions__slim__mainboard--remove" >
            <Button styles={{ lineHeight: '21px' }}
              handleClick={v => removeFrom('mainboard', v)} 
              value={card} text={'─'} title='remove' 
            />
          </li>
          <li className="card-actions__slim__sideboard--add" >
            <Button styles={{ fontSize: '14px', lineHeight: '14px' }}
              handleClick={v => addTo('sideboard', v)} 
              value={card} text='' title='add to sideboard' 
            >
              <span>S<sup>+</sup></span>
            </Button>
          </li>
          <li className="card-actions__slim__sideboard--remove" >
            <Button styles={{fontSize: '14px', lineHeight: '14px' }}
              handleClick={v => removeFrom('sideboard', v)} 
              value={card} text='' title='remove from sideboard' 
            >
              <span>S<sup>─</sup></span>
            </Button>
          </li>
          <li className="card-actions__slim__move-button" >
            <Button
              handleClick={v => moveTo(destination, v)} 
              value={card} text={destination[0].toUpperCase()} title={'move to ' + destination} 
            />
          </li>
        </ul>
      </div>
    );
  }
}

CardActionsMenuSlim.contextTypes = {
  showModal: React.PropTypes.func,
  addTo: React.PropTypes.func,
  removeFrom: React.PropTypes.func,
  moveTo: React.PropTypes.func,
}