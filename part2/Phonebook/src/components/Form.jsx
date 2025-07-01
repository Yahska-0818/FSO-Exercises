const Form = (props) => {
    if (props.type === "I") {
        return (
            <form >
                <div>
                    {props.text} <input value={props.newValue} onChange={props.onChange} />
                </div>
            </form>
        )
    } else if (props.type ==="IIS") {
        return(
            <form onSubmit={props.onSubmit}>
                <div>
                    {props.text1} <input value={props.newValue1} onChange={props.onChange1} />
                </div>
                <div>
                    {props.text2} <input value={props.newValue2} onChange={props.onChange2} />
                </div>
                <div>
                    <button type="submit">{props.text3}</button>
                </div>
            </form>
        )
    }
}

export default Form