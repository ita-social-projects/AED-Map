import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import PropTypes from 'prop-types';
import { fetchDefs } from './actions/list';
import DefItem from './components/DefItem';
import InfoMessage from './components/InfoMessage';
import { defsSearchSelector } from './reducers/listReducer';
import cancelToken from '../../../../shared/cancel-token';

const defsCancelToken = cancelToken();

const useStyles = makeStyles({
  listOuterStyle: {
    width: '100%',
    height: 'calc(100vh - 100px)',
    display: 'block'
  },
  listStyle: {
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    paddingRight: '5px',
    '&:focus': {
      outline: 'none'
    },
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    }
  }
});

const ItemList = ({
  isLoading,
  defibrillators,
  searchedDefs,
  fetchDefItems,
  filter,
  totalCount,
  page
}) => {
  const classes = useStyles();
  const noFilteredDefs =
    !isLoading && filter && !defibrillators.length;
  const isDatabaseEmpty =
    !isLoading && !filter && !defibrillators.length;

  useEffect(() => {
    fetchDefItems();
    return () => {
      defsCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  const handleScroll = event => {
    const {
      scrollHeight,
      scrollTop,
      clientHeight
    } = event.target;
    if (
      totalCount >= page &&
      scrollHeight - Math.ceil(scrollTop) <= clientHeight
    ) {
      fetchDefItems({ page, ...filter });
    }
  };

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
        <DefItem
          styleParam={style}
          defItemInfo={searchedDefs[index]}
        />
      </CellMeasurer>
    );
  };

  const show =
    isLoading || noFilteredDefs || isDatabaseEmpty;

  let message;

  switch (true) {
    case isLoading:
      message = 'Завантаження...';
      break;
    case isDatabaseEmpty:
      message = 'База даних пуста...';
      break;
    case noFilteredDefs:
      message = 'По заданому фільтру нічого не знайдено...';
      break;
    default:
      message = '';
  }

  return (
    <div
      className={classes.listOuterStyle}
      onScroll={handleScroll}
    >
      <AutoSizer>
        {({ width, height }) => {
          //  AutoSizer expands list to width and height of parent automatically
          return (
            <List
              className={classes.listStyle}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowCount={searchedDefs.length}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={10}
            />
          );
        }}
      </AutoSizer>
      <InfoMessage show={show}>{message}</InfoMessage>
    </div>
  );
};
ItemList.defaultProps = {
  searchedDefs: [],
  fetchDefItems: () => null,
  filter: null
};

ItemList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defibrillators: PropTypes.arrayOf(PropTypes.object)
    .isRequired,
  searchedDefs: PropTypes.arrayOf(
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
      informational_plates: PropTypes.string,
      phone: PropTypes.arrayOf(PropTypes.string),
      additional_information: PropTypes.string
    })
  ),
  fetchDefItems: PropTypes.func,
  filter: PropTypes.oneOfType([PropTypes.object]),
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

export default connect(
  state => ({
    isLoading: state.defs.loading,
    defibrillators: state.defs.data,
    filter: state.filter,
    searchedDefs: defsSearchSelector(state),
    totalCount: state.defs.totalCount,
    page: state.defs.page
  }),
  dispatch => ({
    fetchDefItems: params => dispatch(fetchDefs(params))
  })
)(ItemList);
