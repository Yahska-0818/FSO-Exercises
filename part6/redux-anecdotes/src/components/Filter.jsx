import { useDispatch, useSelector } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
import { resetFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state=>state.filter)
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({target}) => dispatch(filterChange(target.value))} value={currentFilter}/>
      <button onClick={() => dispatch(resetFilter())}>Reset</button>
    </div>
  )
}
export default Filter