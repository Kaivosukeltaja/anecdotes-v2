import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  static propTypes = {
    filter: PropTypes.any,
    setFilter: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    this.props.setFilter(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
})

const mapDispatchToProps = {
  setFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
