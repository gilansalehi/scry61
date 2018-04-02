import React, { Component } from 'react';

export default class Flipper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
    }
  }

  flip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    const { flipped } = this.state;
    const width = this.props.size + 'px';
    const height = this.props.size * 1.42625 + 'px';
    return (
      <div key='flip-container' 
        className={"flip-container " + (flipped ? 'show-back' : 'show-front')} 
        onClick={ e => this.flip() }
        style={{ width, height }}
      >
        <div key='flip-content' className="flip-content">
          <div key='flip-content--front' className="flip-content--front" style={{ width, height }}>
            { this.props.children[0] }
          </div>
          <div key='flip-content--back' className="flip-content--back" style={{ width, height }}>
            { this.props.children[1] }
          </div>
        </div>
      </div>
    )
  }
}