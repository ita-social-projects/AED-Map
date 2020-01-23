import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import PropTypes from 'prop-types';
import { fetchDefs } from '../actions/def';
import Point from './Point';
import { defsFilterSelector } from '../reducers/defReducer';
import classes from '../styles';

const ItemList = ({ filteredDefs, fetchDefebs }) => {
  useEffect(
    useCallback(() => {
      fetchDefebs('/api/defibrillator');
      //  fetchDefebs('/defibrillators.js');
    }, [fetchDefebs]),
    []
  );
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer //  dynamically calculates the height of every item
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Point styleParam={style} point={filteredDefs[index]} />
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.listOuterStyle}>
      {filteredDefs.length > 0 ? (
        <AutoSizer>
          {({ width, height }) => {
            //  AutoSizer expands list to width and height of parent automatically
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
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
ItemList.defaultProps = {
  filteredDefs: [],
  fetchDefebs: () => null
};

ItemList.propTypes = {
  filteredDefs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      }),
      actual_date: PropTypes.string,
      floor: PropTypes.number,
      storage_place: PropTypes.string,
      accessibility: PropTypes.string,
      language: PropTypes.string,
      informational_plates: PropTypes.bool,
      phone: PropTypes.arrayOf(PropTypes.string),
      additional_information: PropTypes.string
    })
  ),
  fetchDefebs: PropTypes.func
};

const mapDispatchToProps = {
  fetchDefebs: fetchDefs
};

const mapStateToProps = (state) => ({
  defsState: state.defs,
  filter: state.filter,
  filteredDefs: defsFilterSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
