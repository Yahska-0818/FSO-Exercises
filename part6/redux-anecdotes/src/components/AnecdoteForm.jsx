import {createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { anecdoteNotification, blankNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(anecdoteNotification(content))
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