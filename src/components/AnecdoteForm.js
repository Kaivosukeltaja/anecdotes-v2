import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createAction } from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  static propTypes = {
    createAction: PropTypes.func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createAction(content)

    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createAction
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
