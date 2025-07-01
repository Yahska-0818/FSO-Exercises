import Button from "./Button"
import personServices from '../services/persons'

const Names = ({parts,setPersonsState,setNotiState}) => {
    const deleteButton = (id) => {
        let personName = parts.filter(person=>person.id===id)
        if (window.confirm(`Delete ${personName[0].name}`)) {
            personServices
                    .deletePerson(id)
                    .then(()=>{
                        const resultPersons = parts.filter(person => person.id !== id)
                        setPersonsState(resultPersons)
                        setNotiState(`Deleted ${personName[0].name}`)
                    })
        }
        }

    return (
        <ul style={{"padding":0}} className="namesList">
            {parts.map(part => 
                <li key={part.id} className="listItem">
                    {part.name} {part.number} <Button onClick={()=>deleteButton(part.id)} text={"Delete"} />
                </li> )}
        </ul>
    )
}

export default Names