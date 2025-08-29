import { useSelector, useDispatch } from 'react-redux'
import {voteFor} from '../reducers/anecdoteReducer'
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
        <div key={anecdote.id} style={{display:'flex',gap:"5px"}}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdotes,anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList