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

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const DisplayStats = ({good,neutral,bad}) => {
  if ((good+neutral+bad)>0) {
    return(
      <table>
        <thead>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good+neutral+bad} />
          <StatisticLine text={"average"} value={(good-bad)/(good+neutral+bad)} />
          <StatisticLine text={"neutral"} value={(good/(good+neutral+bad))*100} />
        </thead>
      </table>
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