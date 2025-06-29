const Total = ({parts}) => {
  function getSum(total,current) {
    return total+current.exercises
  }

  let finalSum = parts.reduce(getSum,0)
  return(
    <h3>total of {finalSum} exercises</h3>
  )

}

export default Total