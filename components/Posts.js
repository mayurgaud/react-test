import React, {PropTypes, Component} from 'react'
import {FlexTable, FlexColumn} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

/**
 * Generates view for transactions.
 *
 */
export default class Posts extends Component {
  render() {
    return (
      <FlexTable
        width={700}
        height={300}
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
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
