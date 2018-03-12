import React, { Component } from 'react';

export default class Sidebar extends Component {

  prepareList = () => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const isMobile = mobile.matches;

    const { show, setShow } = this.props;
    const hideAll = { search: false, results: false, deck: false, sidebar: false };
    const base = isMobile ? hideAll : show;

    const panes = 'search results deck'.split(' ');
    return panes.map((pane, i) => {
      return (
        <li key={i} className='hover-hands' 
          onClick={e => { setShow({ ...base, ...{ [pane]: !show[pane] } }) }}
        >
          <span className={`side-bar-list-item ${show[pane] ? 'bold' : ''}`}>
            { show[pane] ? `- ${pane} -` : pane }
          </span>
        </li>
      );
    });
  }

  render() {
    const { show, setShow } = this.props;
    const list = this.prepareList();
    return (
      <div key={'sidebar'} className={`sidebar ${show.sidebar ? 'show' : 'hide'}`}>
        <div className={`sidebar-background dropdown-hider dark-window ${show.sidebar ? 'show' : 'hidden'}`}
          onClick={e => setShow({ sidebar: false })}
        ></div>
        <ul key='sidebar-list' className={`sidebar-list ${show.sidebar ? 'slide-in' : 'slide-out'}`}>
          { list }
        </ul>
      </div>
    )
  }
}