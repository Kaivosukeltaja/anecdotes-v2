import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { voteAction, loadAnecdotesAction } from '../reducers/anecdoteReducer'

export const anecdotesPropType = 
  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })).isRequired

class AnecdoteList extends React.Component {
  static propTypes = {
    anecdotesToShow: anecdotesPropType,
    voteAction: PropTypes.func.isRequired,
    loadAnecdotesAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadAnecdotesAction()
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
  anecdotesToShow: state.filter.filter
    ? state.anecdotes.anecdotes.filter(anecdote => anecdote.content.includes(state.filter.filter))
    : state.anecdotes.anecdotes
})

const mapDispatchToProps = {
  voteAction,
  loadAnecdotesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
