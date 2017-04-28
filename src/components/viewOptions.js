import React, {Component} from 'react';
import Button from './button';
import MultiSelect from './reactmultiselect/multiselect';

export default class ViewOptions extends Component {

  setDefaultCardView = (v) => {
    this.props.setDefaultCardView(v);
  }

  updateSort = (opt) => {
    this.props.updateSorts(opt);
  }

  render() {
    const {sort, sortDir} = this.props;
    const sorts = ['name', 'cmc', 'power', 'toughness'].map((s, i) => {
      return (
        <span className='hover-hands' key={i}
          onClick={e => this.updateSort({ sort: s, sortDir })}
          style={ sort === s ? active : inactive }>
          { s }
        </span>
      );
    });
    const sortDirs = ['ASC', 'DEC'].map((dir, i) => {
      return (
        <span className='hover-hands' key={i}
          onClick={e => this.updateSort({ sort, sortDir: dir })}
          style={ sortDir === dir ? active : inactive }>
          { dir }
        </span>
      );
    })

    return (
      <div className='view-options' style={containerStyle}>
        <ul style={ulStyle}>
          <li style={liStyle} key={1}>
            <span key={1}> Sort: </span>
            <span key={2}>
              { sorts }
            </span>
            <span key={3}>|</span>
            <span key={4}>
              { sortDirs }
            </span>
          </li>
          <li style={liStyle} key={2}>
            <Button handleClick={v => this.setDefaultCardView(v)} value='COLLAPSED' text='≡' />
            <Button handleClick={v => this.setDefaultCardView(v)} value='EXPANDED' text='⊟' />
          </li>
        </ul>
      </div>
    );
  }
}

const openStyle = {
  border: '1px solid #666',
  backgroundColor: '#444',
};

const liStyle = {
  display: 'inline-block',
};

const ulStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

const inactive = {
  padding: '5px',
  color: 'lightgray',
  textTransform: 'uppercase',
  fontSize: '12px',
};

const active = {
  textDecoration: 'underline',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  padding: '5px',
  fontSize: '12px',
}

const containerStyle = {
  fontFamily: '"Cinzel", serif',
  display:'inline-block',
  position:'relative',
  width: '100%',
  padding: '5px',
  color: 'white',
};
