import React, { Component } from 'react';
import PageJumper from './pageJumper';
import ViewOptions from './viewOptions';
import Card from './card';
import CardDisplayer from './cardDisplayer';
import CardImage from './cardImage';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 50,
      cardView: 'ALL',
      imgSize: 200,
      moreOptions: false,
      sorts: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props.cards.length !== nextProps.cards.length && this.setPage(0);
  }

  incrementImgSize = () => {
    const imgSize = Math.min(300, this.state.imgSize + 25);
    this.setState({ imgSize });
  }

  decrementImgSize = () => {
    const imgSize = Math.max(150, this.state.imgSize - 25);
    this.setState({ imgSize });
  }

  prepareResults = () => {
    const {cards, addTo, removeFrom} = this.props;
    const {page, pageSize, cardView, imgSize } = this.state;
    const maxPage = Math.floor(cards.length / pageSize);
    const currentPage = Math.min(page, maxPage);
    const [start, end] = [currentPage*pageSize, (currentPage + 1)*pageSize];
    const customStyle = {
      countStyle: {width:'150px', display:'inline-block'},
    };

    return cards.slice(start, end).map((c, i) => {
      return (
        <li key={ i + cardView } style={resultStyle} className='result-list-item clearfix'>
          <CardDisplayer key={c.name}
            style={customStyle}
            data={c}
            showSet={true}
            view={ cardView }
            imgSize={ imgSize }
            addTo={ addTo }
            removeFrom={ removeFrom }
          />
        </li>
      );
    });
  }

  setDefaultCardView = (string) => {
    this.setState({ cardView: string });
  }

  setPage = (page) => {
    this.setState({ page });
  }

  setPageSize = (e) => {
    const newSize = parseInt(e.target.value) || 0;
    const { page, pageSize } = this.state;
    const location = page * pageSize;
    const newPage = Math.floor(location / (newSize || 1));
    this.setState({ page: newPage, pageSize: newSize });
  }

  toggleShow = () => {
    this.setState({ moreOptions: !this.state.moreOptions });
  }

  render() {
    const { page, pageSize, moreOptions, cardView } = this.state;
    const { sort, sortDir, updateSorts, cards, show } = this.props;

    if ( !show ) { return (<div className="hidden"></div>); }

    const maxPage = Math.floor(cards.length / pageSize);
    const currentPage = Math.min(page, maxPage);
    const results = this.prepareResults(true);
    const sortsMenu = (
      <ViewOptions 
        sort={sort} 
        sortDir={sortDir}
        updateSorts={updateSorts}
        setDefaultCardView={this.setDefaultCardView}
        incrementImgSize={this.incrementImgSize}
        decrementImgSize={this.decrementImgSize}
      />
    );

    return (
      <div className={`search-results clearfix results-view--${cardView.toLowerCase()}`}>
        <div className='results-info'>
          <span> Results: { cards.length } |
            Per Page: <input value={ pageSize } onChange={(e) => this.setPageSize(e)} style={inputStyle} />
          </span>
          <PageJumper currentPage={currentPage} pageSize={pageSize} maxPage={maxPage} setPage={this.setPage} />
          <span className='expando hover-hands' title="Sorts and View Options" onClick={ this.toggleShow }>
            Options: { this.state.moreOptions ? '▴' : '▾' }
          </span>
        </div>
        <div>
          { moreOptions && sortsMenu }
        </div>
        <ul className='results-list' >
          { results }
        </ul>
        <div className='results-info' style={infoStyle}>
          Results: { cards.length }
          <PageJumper currentPage={currentPage} pageSize={pageSize} maxPage={maxPage} setPage={this.setPage} />
        </div>
       </div>
    );
  }
}

const resultStyle = {
  listStyle:'none',
  background:'#ccc',
  border:'1px solid black',
  margin:'5px',
};

const infoStyle = {
  display: 'flex',
  justifyContent:'space-between',
  textAlign: 'left',
  padding: '10px 5px 5px 5px',
  color: '#ccc',
  fontFamily: '"Cinzel", serif',
};

const inputStyle = {
  width: '50px',
  background:'transparent',
  fontFamily:'inherit',
  color: 'inherit',
  boxShadow:'none',
  border: 'none',
  fontSize: '18px',
};
