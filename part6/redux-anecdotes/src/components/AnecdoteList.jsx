import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import { blankNotification, voteNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
    return state.anecdotes
  })
  const displayAnecdotes = [...anecdotes]
  displayAnecdotes.sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()

  return (
    <>
      {displayAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote.id))
              dispatch(voteNotification(anecdote.content))
              setTimeout(() => {
                dispatch(blankNotification())
              }, 5000)
            }}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList