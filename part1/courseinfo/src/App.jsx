const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }

const Part = (props) => {
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
    return(
      <>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises}></Part>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises}></Part>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises}></Part>
      </>
    )
  }

const Total = (props) => {
    return(
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App