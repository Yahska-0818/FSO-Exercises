const ListItem = ({parts}) => {
  return (
    <ul>
      {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
  )
}

const Course = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Total = ({parts}) => {
  function getSum(total,current) {
    return total+current.exercises
  }

  let finalSum = parts.reduce(getSum,0)
  return(
    <h3>total of {finalSum} exercises</h3>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course course={course} />
      <ListItem parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

export default App