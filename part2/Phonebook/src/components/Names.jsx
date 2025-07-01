import Button from "./Button"
import personServices from '../services/persons'

const Names = ({parts,setPersonsState}) => {
    const deleteButton = (id) => {
        let personName = parts.filter(person=>person.id===id)
        if (window.confirm(`Delete ${personName[0].name}`)) {
            personServices
                    .deletePerson(id)
                    .then(()=>{
                        const resultPersons = parts.filter(person => person.id !== id)
                        setPersonsState(resultPersons)
                    })
        }
        }

    return (
        <ul>
            {parts.map(part => 
                <li key={part.id} className="mb-2 flex gap-3 items-center">
                    {part.name} {part.number} <Button onClick={()=>deleteButton(part.id)} text={"Delete"} />
                </li> )}
        </ul>
    )
}

export default Names