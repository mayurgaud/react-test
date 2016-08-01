import React, { PropTypes, Component } from 'react'
import {FlexTable, FlexColumn, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

export default class Posts extends Component {
  render() {
    return (
      <FlexTable
        width={1000}
        height={1000}
        headerHeight={20}
        rowHeight={30}
        rowCount={this.props.posts.length}
        rowGetter={
          ({index}) => this.props.posts[index]
        }
      >
        <FlexColumn
          label='Activity Id'
          dataKey='activity.id'
          width={250}
        />
        <FlexColumn
          width={250}
          label='Transaction Type'
          dataKey='transaction_type'
        />
        <FlexColumn
          width={250}
          label='Value Date'
          dataKey='value_date'
        />
        <FlexColumn
          width={250}
          label='Value'
          dataKey='value'
        />
        <FlexColumn
          width={250}
          label='Currency Code'
          dataKey='value'
        />
      </FlexTable>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
