import { useState } from 'react'
import './styles/App.scss'
import Todo from './components/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Todo/>
    </>
  )
}

export default App
