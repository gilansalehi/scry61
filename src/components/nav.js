import React, { Component } from 'react';
import HamburgerMenu from './icon_menu';
import Dropdown from './dropdown';

export default class Nav extends Component {
  render() {
    return (
      <nav className="App-header">
        <ul className="App-header-nav flex">
          <li className="App-header-nav--one">
            <span className="nav-menu hover-hands" 
              onClick={e => this.props.setShow({ sidebar: true })}
            >
              <HamburgerMenu />
            </span>
          </li>
          <li className="App-header-nav--two">
            <h1>Scry61</h1>
          </li>
          <li className="App-header-nav--three">
            <Dropdown>
              <span className="hover-hands" 
                title="Force Update Card Database"
                onClick={this.props.forceUpdate}
              >Force Update</span>
            </Dropdown>
          </li>
        </ul>
      </nav>
    );
  }
}
