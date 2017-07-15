import React, {Component} from 'react';
import fetchPrice from '../utils/priceFetcher';

export default class CardPrice extends Component {
  constructor(props) {
    super(props);

    this.state = { price: 'searching...'}
  }

  componentDidMount() {
    const { card, printing } = this.props;
    console.log(card);
    console.log(printing);
    fetchPrice(card, printing).then(data => this.setState({ price: data }));
  }

  render() {
    const { price } = this.state;
    return (
      <div>{price}</div>
    );
  }
}
