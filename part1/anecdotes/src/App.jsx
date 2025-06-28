import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [currentVotes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [currentMax, setMax] = useState(0)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const nextAnecdote = () =>{
    let randomNum = getRandomInt(anecdotes.length)
    setSelected(randomNum)
  }

  const addVote = () => {
    let copyOfVotes = [...currentVotes]
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)

    let votesSorted = copyOfVotes.toSorted()
    const lastElement = currentVotes.length - 1
    let maxIndex = copyOfVotes.findIndex(function(element){
      return element === votesSorted[lastElement]
    })
    setMax(maxIndex)
  }

  return (
    <>
      {anecdotes[selected]}
      <br />
      <p>has {currentVotes[selected]} votes</p>
      <div>
          <Button onClick={nextAnecdote} text={"next anecdote"} />
          <Button onClick={addVote} text={"vote"} />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[currentMax]}
    </>
  )
}

export default App