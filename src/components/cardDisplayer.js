import React, {Component} from 'react';
import CardHead from './cardHead';
import CardBody from './cardBody';
import CardActions from './cardActions';

export default class CardDisplayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: !this.props.collapsed,
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

  toggleView = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;
    const { data, cardCount, cardStyle, showImage, showSet } = this.props;
    const cardBody = () => { return (<CardBody data={data} cardStyle={cardStyle} showImage={showImage} showSet={showSet} />); };
    const style = Object.assign({}, styles, this.props.style);

    return (
      <div className='card-displayer'>
        <div className='card-header-bar' style={style.header}>
          <span className='card-count' style={style.countStyle}>{ cardCount }</span>
          <CardHead data={ data } expanded={ expanded } cardStyle={ cardStyle }/>
          <CardActions data={ data }
            expanded={ expanded }
            addToDeck={ this.addToDeck }
            removeFromDeck={ this.removeFromDeck }
            toggleView={ this.toggleView }
          />
        </div>
        <div className='card-body-box'>
          { expanded && cardBody() }
        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    width: '100%',
    display:'flex',
    justifyContent:'space-between',
  },
  countStyle: {
    float: 'left',
    fontWeight: 'bold',
    padding: '0 5px',
  },
};
