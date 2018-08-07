import { showNotificationAction } from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

const getId = () => (100000*Math.random()).toFixed(0)

export const loadAnecdotesAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTES_LOADED',
      anecdotes,
    })
  }
}

export const createAction = (content) => {
  return async (dispatch) => {
    const anecdote = { content, id: getId(), votes:0 }
    await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE',
      anecdote,    
    })
    dispatch(showNotificationAction(`You added ${content}`))
  }
}

export const voteAction = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id,    
    })
    dispatch(showNotificationAction(`You voted ${anecdote.content}`, 3))
  }
}

const initialState = { anecdotes: [] }

const reducer = (state = initialState, action) => {
  if (action.type==='VOTE') {
    const old = state.anecdotes.filter(a => a.id !==action.id)
    const voted = state.anecdotes.find(a => a.id === action.id)

    return { anecdotes: [...old, { ...voted, votes: voted.votes+1} ] }
  }
  if (action.type === 'CREATE') {

    return { anecdotes: [...state.anecdotes, action.anecdote] }
  }
  if (action.type === 'ANECDOTES_LOADED') {
    return { anecdotes: action.anecdotes }
  }

  return state
}

export default reducer
