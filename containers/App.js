import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectReddit, fetchPostsIfNeeded} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {dispatch, selectedReddit} = this.props;
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const {dispatch, selectedReddit} = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit))
  }

  render() {
    const {selectedReddit, posts, isFetching} = this.props;
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
          value={selectedReddit}
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
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {selectedReddit, postsByReddit} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
