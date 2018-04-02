import React, { Component } from 'react';
import CardHead from './cardHead';
import CardBody from './cardBody';
import CardActions from './cardActions';
import CardActionsMenu from './cardActionsMenu';
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

  addToDeck = () => {
    const { data } = this.props;
    this.props.addToDeck(data);
  }

  removeFromDeck = () => {
    const { data } = this.props;
    this.props.removeFromDeck(data);
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
    const { data, cardCount, cardStyle, showSet, imgSize } = this.props;
    const style = Object.assign({}, styles, this.props.style);
    const image = (
      <Flipper size={imgSize}>
        <div className='card-image-container' style={{ width: imgSize + 'px' }}>
          <CardImage card={data} printing={printing} />
        </div>
        <CardActionsMenu data={data}
          expanded={['EXPANDED', 'ALL'].includes(view)}
          addToDeck={this.addToDeck}
          removeFromDeck={this.removeFromDeck}
          toggleView={this.toggleView}
        />
      </Flipper>
    );

    return (
      <div key={data.name + view} className={`card-displayer view--${view.toLowerCase()}`}>
        { ['ALL', 'EXPANDED', 'IMAGE'].includes(view) && image }
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
