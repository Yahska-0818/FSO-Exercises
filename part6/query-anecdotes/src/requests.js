import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post('http://localhost:3001/anecdotes',newAnecdote)

export const addVotes = (changedAnecdote) =>
  axios.put(`http://localhost:3001/anecdotes/${changedAnecdote.id}`,changedAnecdote)