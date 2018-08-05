import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Notification extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (!this.props.text) return null
    return (
      <div style={style}>
        { this.props.text }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  text: state.notifications.notification
})

export default connect(mapStateToProps)(Notification)
