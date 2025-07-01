const Noti = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="bg-green-600 text-white text-lg border-solid border-4 border-green-950 my-3 p-3">
      {message}
    </div>
  )
}

export default Noti