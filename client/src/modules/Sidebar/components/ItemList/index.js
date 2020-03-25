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
import InfoMessage from './components/InfoMessage';
import HorizontalLoader from '../../../../shared/Loader/HorizontalLoader';
import DefItem from './components/DefItem';
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
    '&:focus': {
      outline: 'none'
    },
    '&::-webkit-scrollbar': {
      width: 5
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
  page,
  search
}) => {
  const classes = useStyles();
  const noData = !isLoading && !defibrillators.length;
  const showMessage =
    (isLoading && !defibrillators.length) || noData;
  const showHorizontalLoader =
    isLoading && !!defibrillators.length;
  let message;

  switch (true) {
    case isLoading:
      message = 'Завантаження...';
      break;
    case noData:
      message = 'Даних не знайдено...';
      break;
    default:
      message = '';
  }

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  const handleScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event;

    if (
      totalCount >= page &&
      scrollHeight - Math.ceil(scrollTop) <= clientHeight
    ) {
      fetchDefItems({ page, ...filter, ...search });
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

  useEffect(() => {
    if (!defibrillators.length) {
      fetchDefItems();
    }
    return () => {
      defsCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.listOuterStyle}>
      <AutoSizer>
        {({ width, height }) => {
          //  AutoSizer expands list to width and height of parent automatically
          return (
            <List
              onScroll={handleScroll}
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
      {showMessage && <InfoMessage>{message}</InfoMessage>}
      {showHorizontalLoader && <HorizontalLoader />}
    </div>
  );
};

ItemList.defaultProps = {
  searchedDefs: [],
  fetchDefItems: () => null,
  filter: null,
  user: null
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
  page: PropTypes.number.isRequired,
  search: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default connect(
  state => ({
    isLoading: state.defs.loading,
    defibrillators: state.defs.listData,
    filter: state.filter,
    searchedDefs: state.defs.listData,
    totalCount: state.defs.totalCount,
    page: state.defs.page,
    search: state.search,
    user: state.user.user
  }),
  dispatch => ({
    fetchDefItems: params => dispatch(fetchDefs(params))
  })
)(ItemList);
