import React, {PropTypes, Component} from 'react'
import {FlexTable, FlexColumn, InfiniteLoader} from 'react-virtualized';
import shallowCompare from 'react-addons-shallow-compare'
import 'react-virtualized/styles.css'; // only needs to be imported once

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

/**
 * Generates view for transactions.
 *
 */
export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0
    };

    this._timeoutIdMap = {};

    this._isRowLoaded = this._isRowLoaded.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
  }

  componentWillUnmount() {
    Object.keys(this._timeoutIdMap).forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  /**
   * Check if the rows are loaded or loading.
   *
   * @param index
   * @returns {boolean}
   * @private
   */
  _isRowLoaded({index}) {
    const {loadedRowsMap} = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  /**
   * Fetch more rows to show in list.
   *
   * @param startIndex
   * @param stopIndex
   * @returns {Promise}
   * @private
   */
  _loadMoreRows({startIndex, stopIndex}) {
    const {loadedRowsMap, loadingRowCount} = this.state;
    const increment = stopIndex - startIndex + 1;

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment
    });

    const timeoutId = setTimeout(() => {
      const {loadedRowCount, loadingRowCount} = this.state;

      delete this._timeoutIdMap[timeoutId];

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      });

      promiseResolver()
    }, 1000 + Math.round(Math.random() * 2000));

    this._timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve
    })
  }

  render() {
    const {loadedRowCount, loadingRowCount} = this.state;

    return (
      <div>
        <div >
          {`${loadingRowCount} loading, ${loadedRowCount} loaded`}
        </div>
        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={this.props.posts.length}
        >
          {({onRowsRendered, registerChild}) => (
            <FlexTable
              ref={registerChild}
              width={700}
              height={300}
              headerHeight={20}
              onRowsRendered={onRowsRendered}
              rowHeight={30}
              rowCount={this.props.posts.length}
              rowGetter={
                ({index}) => this.props.posts[index]
              }
            >
              <FlexColumn
                label='Activity Id'
                dataKey='activityId'
                width={200}
              />
              <FlexColumn
                width={100}
                label='Transaction Type'
                dataKey='transactionType'
              />
              <FlexColumn
                width={100}
                label='Value Date'
                dataKey='valueData'
              />
              <FlexColumn
                width={100}
                label='Value'
                dataKey='value'
              />
              <FlexColumn
                width={100}
                label='Currency Code'
                dataKey='currencyCode'
              />
            </FlexTable>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
