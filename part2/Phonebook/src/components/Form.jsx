const Form = (props) => {
    if (props.type === "I") {
        return (
            <form >
                <div className="inputText">
                    {props.text} <input value={props.newValue} onChange={props.onChange} className="inputField" />
                </div>
            </form>
        )
    } else if (props.type ==="IIS") {
        return(
            <form onSubmit={props.onSubmit} className="formDiv">
                <div className="inputText">
                    {props.text1} <input value={props.newValue1} onChange={props.onChange1} className="inputField" />
                </div>
                <div className="inputText">
                    {props.text2} <input value={props.newValue2} onChange={props.onChange2} className="inputField" />
                </div>
                <div className="inputText">
                    <button className="button" type="submit">{props.text3}</button>
                </div>
            </form>
        )
    }
}

export default Form