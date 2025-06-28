import { useState } from 'react'

const Display = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const DisplayStats = ({good,neutral,bad}) => {
  if ((good+neutral+bad)>0) {
    return(
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good+neutral+bad}</p>
        <p>average {(good-bad)/(good+neutral+bad)}</p>
        <p>positive {(good/(good+neutral+bad))*100} %</p>
      </>
    )
  } else {
    return(
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = () => {
    let newGood = good + 1
    setGood(newGood)
  }

  const changeNeutral = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const changeBad = () => {
    let newBad = bad + 1
    setBad(newBad)
  }

  return (
    <>
    <Display text={"give feedback"} />
    <div>
      <Button onClick={changeGood} text="Good" />
      <Button onClick={changeNeutral} text="Neutral" />
      <Button onClick={changeBad} text="Bad" />
    </div>
    <Display text={"Statistics"} />
    <DisplayStats good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App