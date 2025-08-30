import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {addVotes, getAnecdotes } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {

  const dispatch = useNotificationDispatch()

  const queryClient =  useQueryClient()

  const addVotesMutation = useMutation({
    mutationFn:addVotes,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    addVotesMutation.mutate({...anecdote,votes:anecdote.votes+1})
    dispatch({type:"SET_NOTIFICATION",payload:`You voted for ${anecdote.content}`})
    setTimeout(() => {
      dispatch({type:"BLANK_NOTIFICATION"})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.status == 'error') {
    return <div>error fetching data</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
