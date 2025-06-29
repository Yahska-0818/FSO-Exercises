import ListItem from "./ListItem"
import Total from "./Total"

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

export default Course