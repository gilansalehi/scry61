import React, {Component} from 'react';

export default class Modal extends Component {
  render() {
    return (
      <div className='modal-wrapper'>
        <div className='dropdown-hider' onClick={ this.props.hideModal } />
        <div className='modal clearfix'>
          <div className='modal__header'>
            <span></span>
            <span>{this.props.title || ''}</span>
            <span className='close-modal hover-hands' onClick={this.props.hideModal}>×</span>
          </div>
          <div className='modal__body'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
