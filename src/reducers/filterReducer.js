const initialState = { filter: '' }

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  filter,
})

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_FILTER':
    return { filter: action.filter }
  default:
    return state
  }
}

export default reducer
