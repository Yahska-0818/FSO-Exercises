import { useParams } from "react-router-dom";

const Anecdote = ({anecdoteById, vote}) => {
  const id = Number(useParams().id)
  const anecdote = anecdoteById(id)
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => vote(id)}>vote</button>
      <p>for more info see <a href={anecdote.info} target="#">{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote