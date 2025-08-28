const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE': return action.payload
    case 'RESET': return ''
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'CHANGE',
    payload: filter
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET'
  }
}

export default filterReducer