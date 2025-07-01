const Form = (props) => {
    if (props.type === "I") {
        return (
            <form >
                <div className="text-lg">
                    {props.text} <input value={props.newValue} onChange={props.onChange} className="text-base border-solid border-2 border-black rounded p-1"/>
                </div>
            </form>
        )
    } else if (props.type ==="IIS") {
        return(
            <form onSubmit={props.onSubmit} className="flex gap-3">
                <div className="text-lg">
                    {props.text1} <input value={props.newValue1} onChange={props.onChange1} className="text-base border-solid border-2 border-black rounded p-1"/>
                </div>
                <div className="text-lg">
                    {props.text2} <input value={props.newValue2} onChange={props.onChange2} className="text-base border-solid border-2 border-black rounded p-1"/>
                </div>
                <div className="text-lg">
                    <button type="submit" className="text-base border-solid border-2 border-black rounded p-1">{props.text3}</button>
                </div>
            </form>
        )
    }
}

export default Form