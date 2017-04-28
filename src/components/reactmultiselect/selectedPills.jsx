import React, { Component, PropTypes } from 'react';
import Pill from './pill';

export default class SelectedPills extends Component {

  constructor(props) {
    super(props);

    this.buildPillList = this.buildPillList.bind(this);
    this.deletePill = this.deletePill.bind(this);

    const { klasses, inlineStyles } = this.props;
    this.klasses = klasses ? Object.assign({}, defaultKlasses, klasses) : {};
    this.styles = inlineStyles ? Object.assign({}, defaultStyles, inlineStyles) : {};
  }

  buildPillList(pills) {
    const pillList = pills.map((pill) => {
      return (
        <li key={ pill.name } style={ this.styles.pillListItem } className={ this.klasses.pillListItem }>
          <Pill
            name={ pill.name }
            id={ pill.id }
            pill={ pill }
            deletePill={ this.deletePill }
            inlineStyles={ this.props.inlineStyles }
            klasses={ this.props.klasses }
            multiple={ this.props.multiple }
          />
        </li>
      )
    });

    return pillList;
  }

  deletePill(pill) { this.props.deletePill(pill) }

  render() {
    const { pills, klasses, placeholder, inputDisplayed } = this.props;
    const pillList = this.buildPillList(pills)

    if ( pillList.length ) {
      return (
        <div className={ this.klasses.pillListWrapper } style={ this.styles.pillListWrapper }>
          <ul className={ this.klasses.pillList } style={ this.styles.pillList }>
            { pillList }
          </ul>
        </div>
      );
    } else {
      return ( 
        <div className={ this.klasses.placeholder } style={ this.styles.placeholder }>
          { placeholder }
        </div>
      );
    }
  }
};

const defaultStyles = {
  pillListWrapper: {
    display: 'block',
    float: 'left',
  },
  pillList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'block',
    float: 'left',
  },
  pillListItem: {
    display: 'inline-block',
    margin: '0',
    float: 'left',
    padding: 0,
    listStyle: 'none',
  },
  placeholder: {
    padding: '5px 10px',
    lineHeight: '20px',
  },
};

const defaultKlasses = {
  placeholder: 'pill-list-placeholder',
  pillListWrapper: 'pill-list-wrapper',
  pillListItem: 'clearfix',
  pillList: 'pill-list',
};
