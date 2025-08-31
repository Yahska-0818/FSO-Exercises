import { useState } from 'react'
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

const App = () => {
  const padding = {
    paddingRight: 5
  }
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>

      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
          <p>{notification}</p>
        </div>

        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdoteById={anecdoteById} vote={vote}/>}></Route>
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
