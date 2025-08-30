import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient =  useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({type:"SET_NOTIFICATION",payload:"Anecdote length should be more than 5 characters"})
      setTimeout(() => {
        dispatch({type:"BLANK_NOTIFICATION"})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    dispatch({type:"SET_NOTIFICATION",payload:`You created ${content}`})
    setTimeout(() => {
      dispatch({type:"BLANK_NOTIFICATION"})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
