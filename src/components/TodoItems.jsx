import React, { useState } from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not.png'
import delete_icon from '../assets/delete.png'
import edit_icon from '../assets/edit.png'

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(text)

  const handleEdit = () => {
    if (isEditing) {
      editTodo(id, newText)
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className='flex items-center my-3 gap-2'>

      <div 
        onClick={() => !isEditing && toggle(id)}
        className='flex flex-1 items-center cursor-pointer'
      >
        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />

        {!isEditing ? (
          <p
            className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        ) : (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter") handleEdit()
            }}
            className="ml-4 border rounded px-2 py-1 w-full"
            autoFocus
          />
        )}
      </div>

      {/* Edit button */}
      <img
        onClick={handleEdit}
        src={edit_icon}
        alt=""
        className="w-6 cursor-pointer"
      />

      {/* Delete button */}
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt=""
        className="w-6 cursor-pointer"
      />
    </div>
  )
}

export default TodoItems
