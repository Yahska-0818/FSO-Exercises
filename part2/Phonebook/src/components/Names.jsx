const Names = ({parts}) => {
    return (
        <ul style={{"padding":0}}>
            {parts.map(part => <li key={part.id}>{part.name} {part.number}</li> )}
        </ul>
    )
}

export default Names