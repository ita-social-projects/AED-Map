import React from 'react';
import Point from './Point';

import { connect } from 'react-redux';
import { defsFilterSelector } from '../reducers/defReducer';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import classes from '../styles';
const ItemList = ({ defsState, filteredDefs }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });
  const rowRenderer = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer //dynamically calculates the height of every item
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <Point
          styleParam={style}
          point={filteredDefs[index]}
        />
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.listOuterStyle}>
      <AutoSizer>
        {({ width, height }) => {
          //AutoSizer expands list to width and height of parent automatically
          return (
            <List
              className={classes.listStyle}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowCount={filteredDefs.length}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={10}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defsState: state.defs,
  filter: state.filter,
  filteredDefs: defsFilterSelector(state),
});

export default connect(mapStateToProps, null)(ItemList);
