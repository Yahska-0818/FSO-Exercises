const Button = (props) => {
    return(
        <button type="button" onClick={props.onClick} className="font-base border-solid border-2 border-black rounded p-1">{props.text}</button>
    )
}

export default Button