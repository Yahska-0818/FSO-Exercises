import {createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { anecdoteNotification, blankNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(anecdoteNotification(newAnecdote.content))
    setTimeout(() => {
      dispatch(blankNotification())
    }, 5000)

  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm