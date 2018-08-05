const initialState = { notification: null }

export const hideNotificationAction = () => ({
  type: 'HIDE_NOTIFICATION',
})

export const showNotificationAction = text => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      text,
    })
    setTimeout(() => {
      dispatch(hideNotificationAction())
    }, 5000)
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SHOW_NOTIFICATION':
    return { notification: action.text }
  case 'HIDE_NOTIFICATION':
    return { notification: null }
  default:
    return state
  }
}

export default reducer
