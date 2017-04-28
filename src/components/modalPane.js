import React, {Component} from 'react';

export default class Modal extends Component {
  render() {
    return (
      <div className='modal-wrapper'>
        <div className='dropdown-hider' onClick={ this.props.hideModal } />
        <div className='modal clearfix'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
