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
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  listOuter: {
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    paddingRight: '5px',
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
  },
  listContainer: {
    width: '100%',
    height: 'calc(100vh - 100px)',
  },
});

const ItemList = ({ defsState, filteredDefs }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const classes = useStyle();

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
    <div className={classes.listContainer}>
      <AutoSizer>
        {({ width, height }) => {
          //AutoSizer expands list to width and height of parent automatically
          return (
            <List
              className={classes.listOuter}
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
