import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { notificationAction } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state,action) {
      return action.payload
    },
    setVote (state,action) {
      const id = action.payload.id
      const changedAnecdote = action.payload.changedAnecdote
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
  }
})

export const {setAnecdotes,appendAnecdote,setVote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(notificationAction(`You create ${content}`,10))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (anecdotes,id) => {
  return async dispatch => {
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes+1
    }
    await anecdoteService.editVotes(id,changedAnecdote)
    dispatch(setVote({id,changedAnecdote}))
    dispatch(notificationAction(`You voted ${changedAnecdote.content}`,10))
  }
}

export default anecdoteSlice.reducer