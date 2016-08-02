import React, {PropTypes, Component} from 'react'
import {FlexTable, FlexColumn, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

/**
 * Generates view for transactions.
 *
 */
export default class Posts extends Component {

  _isRowLoaded ({ index }) {
    return !!this.props.posts[index];
  }

  _loadMoreRows ({ startIndex, stopIndex }) {
    return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
      .then(response => {
        // Store response data in list...
      })
  }

  render() {
    return (
      <InfiniteLoader
        isRowLoaded={this._isRowLoaded}
        loadMoreRows={this._loadMoreRows}
        rowCount={this.props.posts.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <FlexTable
            width={700}
            height={300}
            headerHeight={40}
            rowHeight={30}
            rowCount={this.props.posts.length}
            rowGetter={
              ({index}) => this.props.posts[index]
            }
          >
            <FlexColumn
              label='Activity Id'
              dataKey='activityId'
              width={300}
            />
            <FlexColumn
              width={150}
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
              width={150}
              label='Currency Code'
              dataKey='currencyCode'
            />
          </FlexTable>
        )}
      </InfiniteLoader>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
