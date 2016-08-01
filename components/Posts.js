import React, {PropTypes, Component} from 'react'
import {FlexTable, FlexColumn, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

/**
 * Generates view for transactions.
 *
 */
export default class Posts extends Component {
  render() {
    return (
      <FlexTable
        width={1200}
        height={600}
        headerHeight={20}
        rowHeight={30}
        rowCount={this.props.posts.length}
        rowGetter={
          ({index}) => this.props.posts[index]
        }
      >
        <FlexColumn
          label='Activity Id'
          dataKey='activityId'
          width={400}
        />
        <FlexColumn
          width={250}
          label='Transaction Type'
          dataKey='transactionType'
        />
        <FlexColumn
          width={250}
          label='Value Date'
          dataKey='valueData'
        />
        <FlexColumn
          width={250}
          label='Value'
          dataKey='value'
        />
        <FlexColumn
          width={300}
          label='Currency Code'
          dataKey='currencyCode'
        />
      </FlexTable>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
