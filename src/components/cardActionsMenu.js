import React, { Component } from 'react';
import Button from './button';

export default class CardActionsMenu extends Component {

  noFlip(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { addTo, removeFrom, data } = this.props;
    return (
      <ul className='card-actions-list'>
        <li>
          <span className="card-title">{ data.name }</span>
        </li>
        <li>
          <Button handleClick={e => removeFrom('mainboard', data)} text='─' />
          <span onClick={this.noFlip}>Deck</span>
          <Button handleClick={e => addTo('mainboard', data)} text='+' />
        </li>
        <li>
          <Button handleClick={e => removeFrom('sideboard', data)} text='─' />
          <span onClick={this.noFlip}>Sideboard</span>
          <Button handleClick={e => addTo('sideboard', data)} text='+' />
        </li>
        <li className="hover-inset hover-hands">
          <span>Flip Back</span>
        </li>
      </ul>

    );
  }
}
