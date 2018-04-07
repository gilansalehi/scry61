import React, { Component } from 'react';
import Button from './button';
import CardHead from './cardHead';
import CardBody from './cardBody';
import CardActions from './cardActions';
import CardActionsMenu from './cardActionsMenu';
import CardActionsMenuSlim from './cardActionsMenuSlim';
import CardImage from './cardImage';
import Flipper from './flipContainer';

export default class CardDisplayer extends Component {
  constructor(props) {
    super(props);

    const { printings } = this.props.data;

    this.state = {
      view: this.props.view,
      printing: printings[0],
    };
  }

  setPrinting = (printing) => {
    this.setState({ printing });
  }

  toggleView = (e) => {
    const view = this.state.view === 'COLLAPSED' ? 'EXPANDED' : 'COLLAPSED';
    this.setState({ view });
  }

  render() {
    const { view, printing } = this.state;
    const { data, cardCount, cardStyle, showSet, imgSize, location } = this.props;
    const { addTo, removeFrom, moveTo } = this.context;
    const style = Object.assign({}, styles, this.props.style);
    const image = (
      <Flipper size={imgSize}>
        <div className='card-image-container' style={{ width: imgSize + 'px' }}>
          <CardImage card={data} printing={printing} />
        </div>
        <CardActionsMenu
          card={data}
          printing={printing}
          expanded={['EXPANDED', 'ALL'].includes(view)}
          addTo={addTo}
          removeFrom={removeFrom}
          toggleView={this.toggleView}
          setPrinting={this.setPrinting}
        />
      </Flipper>
    );

    return (
      <div key={data.name + view} className={`card-displayer view--${view.toLowerCase()}`}>
        {['ALL', 'EXPANDED', 'IMAGE'].includes(view) && image}
        <div className="card-actions__slim__menu-container">
          <span className="card-count">{ cardCount || '' }</span>
          <CardActionsMenuSlim card={data} printing={printing} location={location} />
        </div>
        <div className='card-data-container'>
          <div className='card-header-bar hover-hands' style={style.header} onClick={this.toggleView}>
            <CardHead data={data} view={view} cardStyle={cardStyle} />
          </div>
          <div className='card-body-box'>
            <CardBody data={data}
              cardStyle={cardStyle}
              showSet={showSet}
              setPrinting={this.setPrinting}
              printing={printing}
            />
          </div>
        </div>
      </div>
    )
  }
}

CardDisplayer.contextTypes = {
  showModal: React.PropTypes.func,
  addTo: React.PropTypes.func,
  removeFrom: React.PropTypes.func,
  moveTo: React.PropTypes.func,
}

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse',
  },
  countStyle: {
    float: 'left',
    fontWeight: 'bold',
    padding: '0 5px',
  },
};
