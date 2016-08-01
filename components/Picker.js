import React, {Component, PropTypes} from 'react'

/**
 * Generates transaction type drop down.
 *
 */
export default class Picker extends Component {
  render() {
    const {value, onChange, options} = this.props;

    return (
      <span>
        <select
          onChange={e => onChange(e.target.value)}
          value={value}
        >
          {options.map((option, i) =>
            option ?
              <option value={i} key={option}>
                {option}
              </option> :
              <option value='' key={i}>--Select Transaction Type--</option>)
          }
        </select>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
