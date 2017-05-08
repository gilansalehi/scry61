import React, {Component} from 'react';
import Button from './button';

export default class CardActions extends Component {
  render() {
    return (
      <span className='card-actions'   style={{float: 'right', width:'73px'}}>
        <Button handleClick={e => this.props.toggleView() }     text={ this.props.expanded ? '▴' : '▾' } />
        <Button handleClick={e => this.props.removeFromDeck() } text='─' />
        <Button handleClick={e => this.props.addToDeck() }      text='+' />
      </span>
    );
  }
}
