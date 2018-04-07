import React, { Component, PropTypes } from 'react';

export default class Dropdown extends Component {
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

  render() {
    const { expanded } = this.state;

    return (
      <div className='dropdown-menu'>
        <span className='expando hover-hands' onClick={this.toggleView}>{ expanded ? '▴' : '▾' }</span>

        <div className={expanded ? 'dropdown-hider' : 'hidden'} onClick={this.hideMenu}></div>
        <ul className={expanded ? 'dropdown clearfix' : 'hidden'}>
          { this.props.children }
        </ul>
      </div>
    );
  }
}