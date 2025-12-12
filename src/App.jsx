import React from 'react'
import Todo from './components/Todo.jsx'

const App = () => {
  return (
    <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                bg-[length:200%_200%] animate-bgMove grid py-4 min-h-screen'>
      <Todo />

    </div>
  )
}

export default App
