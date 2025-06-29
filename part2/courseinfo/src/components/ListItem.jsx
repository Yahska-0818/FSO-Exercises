const ListItem = ({parts}) => {
  return (
    <ul style={{padding:0}}>
      {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
  )
}

export default ListItem