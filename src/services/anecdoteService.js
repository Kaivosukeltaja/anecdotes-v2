import axios from 'axios'
const baseUrl = '/anecdotes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

const deleteAnecdote = async (anecdote) => {
  const response = await axios.delete(`${baseUrl}/${anecdote.id}`)
  return response.data
}

export default { getAll, create, update, deleteAnecdote }
