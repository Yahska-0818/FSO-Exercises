import { createSlice } from "@reduxjs/toolkit";

const initialState = 'Notifications will appear here'

const notiSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    voteNotification (state,action) {
      return `you voted ${action.payload}`
    },
    anecdoteNotification (state,action) {
      return `you created ${action.payload}`
    },
    blankNotification () {
      return initialState
    }
  }
})

export const {voteNotification,anecdoteNotification,blankNotification} = notiSlice.actions
export default notiSlice.reducer