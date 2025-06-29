const ListItem = ({parts}) => {
  return (
    <ul style={{padding:0}}>
      {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
  )
}

const Course = ({courses}) => {
  return (
    <ul style={{padding:0}}>
      {courses.map(course => 
      <li key={course.id}>
        <h2>{course.name}</h2>
        <ListItem parts = {course.parts} />
        <Total parts = {course.parts} />
      </li>)}
    </ul>
  )
}

const MainDisply = ({title}) => {
  return (
    <h1>{title}</h1>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <MainDisply title={"Web Development Curriculum"} />
      <Course courses={courses} />
    </>
  )
}

export default App