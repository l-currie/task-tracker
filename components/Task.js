import React from 'react'

function Task({description, id, priority, complete, edit, remove, remove2, priorityValue}) {
    return (
        <div className={priority+'Background'}>

            <p className='text-[#fff] '> <span className={priority+'Text'}>{priorityValue < 4 ? priority.substring(0,1) + " - ": priority + " - "}</span>{'  ' + description}</p>
            
            <div className={priorityValue < 4 ? "visible" : "hidden"}>
            <button className='pl-2 text-[#fff] text-2xl hover:text-[#0f0] hover:scale-125 duration-100 ease-linear' onClick={() => complete(id, description)}> ✔️ </button>
            <button className='pl-1 text-[#fff] text-xl hover:text-[#0f0] hover:scale-125 duration-100 ease-linear' onClick={() => edit(id)}> ✏️ </button>
            <button className='pl-1 text-[#fff] text-xl hover:text-[#0f0] hover:scale-125 duration-100 ease-linear' onClick={() => remove(id)}> ❌ </button>
            </div>
            <div className={priorityValue < 4 ? "hidden" : "visible"}>
            <button className='pl-1 text-[#fff] text-xl hover:text-[#0f0] hover:scale-125 duration-100 ease-linear' onClick={() => remove2(id)}> ✔️ </button>
            </div>
        </div>
    )
}

export default Task