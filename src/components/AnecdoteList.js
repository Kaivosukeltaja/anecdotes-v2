import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { voteAction } from '../reducers/anecdoteReducer'

export const anecdotesPropType = 
  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })).isRequired

class AnecdoteList extends React.Component {
  static propTypes = {
    anecdotes: anecdotesPropType,
    voteAction: PropTypes.func.isRequired,
    filter: PropTypes.string,
  }

  render() {
    const anecdotes = !this.props.filter
      ? this.props.anecdotes
      : this.props.anecdotes.filter(anecdote => anecdote.content.includes(this.props.filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.props.voteAction(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  anecdotes: state.anecdotes.anecdotes,
  filter: state.filter.filter,
})

const mapDispatchToProps = {
  voteAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
