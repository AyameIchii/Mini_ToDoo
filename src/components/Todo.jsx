import React from 'react'
import doit from '../assets/doit.png'
import TodoItems from './TodoItems'
import { useRef, useState, useEffect } from 'react'

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  )

  const inputRef = useRef()

  const add = () => {
    const inputText = inputRef.current.value.trim()
    if (inputText === "") return null

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }

    setTodoList(prev => [...prev, newTodo])
    inputRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodoList(prev => prev.filter(todo => todo.id !== id))
  }

  const toggle = (id) => {
    setTodoList(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    )
  }

  // >>> Thêm hàm chỉnh sửa <<<
  const editTodo = (id, newText) => {
    setTodoList(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

      {/* Title */}
      <div className='flex items-center mt-7 gap-2'>
        <img src={doit} alt="doit" className='w-8 h-8' />
        <h1 className='text-3xl font-semibold'>Công Việc Hôm Nay</h1>
      </div>

      {/* Input */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type="text"
          placeholder='Thêm công việc mới!!'
          onKeyDown={(e) =>{
            if (e.key === "Enter") add()
          }}
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-gradient-to-br from-orange-600 to-amber-300 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          Thêmm
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={editTodo}       // <== Truyền xuống
            />
          )
        })}
      </div>

    </div>
  )
}

export default Todo
