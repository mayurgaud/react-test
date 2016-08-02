import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectTransaction, fetchPostsIfNeeded} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {dispatch, selectedTransaction} = this.props;
    dispatch(fetchPostsIfNeeded(selectedTransaction))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTransaction !== this.props.selectedTransaction) {
      const {dispatch, selectedTransaction} = nextProps;
      dispatch(fetchPostsIfNeeded(selectedTransaction))
    }
  }

  handleChange(nextTransaction) {
    this.props.dispatch(selectTransaction(nextTransaction))
  }

  render() {
    const {selectedTransaction, posts, isFetching} = this.props;
    let transactions = [];
    transactions = posts.map(post => ({
      activityId: post.activity.id,
      transactionType: post.transaction_type.name,
      valueData: post.value_date,
      value: post.value,
      currencyCode: post.currency.code
      }));

    const isEmpty = posts.length === 0;
    return (
      <div>
        <Picker
          value={selectedTransaction}
          onChange={this.handleChange}
          options={[
            '',
            'Incoming Funds',
            'Commitment',
            'Disbursement',
            'Expenditure',
            'Interest Repayment',
            'Loan Repayment',
            'Reimbursement',
            'Purchase of Equity',
            'Sale of Equity',
            'Credit Guarantee'
          ]}
        />
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{opacity: isFetching ? 0.5 : 1}}>
          <Posts posts={transactions}/>
        </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedTransaction: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {selectedTransaction, postsByTransaction} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByTransaction[selectedTransaction] || {
    isFetching: true,
    items: []
  };

  return {
    selectedTransaction,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
