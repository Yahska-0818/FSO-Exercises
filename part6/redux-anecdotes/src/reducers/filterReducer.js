import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
    resetFilter() {
      return ''
    },
  },
})

export const { filterChange, resetFilter } = filterSlice.actions

export default filterSlice.reducer