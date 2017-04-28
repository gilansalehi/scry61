import React, {Component} from 'react';
import Button from './button';

export default class PageJumper extends Component {

  changePage = (value) => {
    const {currentPage, pageSize, maxPage} = this.props;
    let nextPage = currentPage + value;
    if ( nextPage < 0 ) { nextPage = 0; }
    if ( nextPage > maxPage ) { nextPage = maxPage; }
    this.props.setPage(nextPage);
  }

  render() {
    const {currentPage, maxPage} = this.props;
    return (
      <span className='page-jumper' style={style}>
        <Button handleClick={v => this.changePage(v) } value={ -999 } text={'|<'} />
        <Button handleClick={v => this.changePage(v) } value={ -3 } text={'≪'} />
        <Button handleClick={v => this.changePage(v) } value={ -1 } text={'<'} />
        <span> Page {currentPage + 1} of {maxPage + 1} </span>
        <Button handleClick={v => this.changePage(v) } value={ 1 } text={'>'} />
        <Button handleClick={v => this.changePage(v) } value={ 3 } text={'≫'} />
        <Button handleClick={v => this.changePage(v) } value={ 999 } text={'>|'} />
      </span>
    )
  }
}

const style = {
  display: 'inline-block',
  float: 'right',
}
