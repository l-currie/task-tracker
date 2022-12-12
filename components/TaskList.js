import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import Task from './Task'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TaskList() {

    const [tasks, setTasks] = useState([])
    const tasksCollectionRef = collection(db, "tasks")

    useEffect(() => {
        //good practice in react to make an inner async function, and then call it 
        const getTasks = async () => {
            const data = await getDocs(tasksCollectionRef)
            var temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setTasks(temp.sort(compareFunc))
        }
        getTasks()
        // add an empty array dependancy so that the database does not read constantly
    }, [])

    const updatePage = async () => {
        const data = await getDocs(tasksCollectionRef)
        var temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setTasks(temp.sort(compareFunc))
    }


    const addNewTask = async () => {
        const desc = document.getElementById('descBox').value
        const priorityBox = document.getElementById('priorityBox')
        var prio = priorityBox.options[priorityBox.selectedIndex].text
        var priorityVal = priorityBox.value
        document.getElementById('descBox').value = ''
        await addDoc(tasksCollectionRef, { description: desc, priorityValue: priorityVal, priority: prio, id: tasks.length + 1 })
        await updatePage()
        
    }

    const updateTask = async (id) => {
        const taskDoc = doc(db, "tasks", id)
        const priorityBox = document.getElementById('priorityBox')
        const newFields = {
            description: document.getElementById('descBox').value,
            priority: priorityBox.options[priorityBox.selectedIndex].text,
            priorityValue: priorityBox.value,
            id: id
        }
        await updateDoc(taskDoc, newFields)
        await updatePage()
        toast('✏️ Task Updated', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-Update'
        })
    }

    const deleteTask = async (id) => {
        const taskDoc = doc(db, "tasks", id)
        await deleteDoc(taskDoc)
        await updatePage()
        toast('❌Task Deleted', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-Delete'
        });
    }

    const completeTask = async (id, description) => {
        const taskDoc = doc(db, "tasks", id)
        const newFields = {
            description: description,
            priority: "Completed",
            priorityValue: 4,
            id: id
        }
        await updateDoc(taskDoc, newFields)
        await updatePage()
        toast('✔️ Task Completed', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-Complete'
        });
    }

    const removeCompletedTask = async (id) => {
        const taskDoc = doc(db, "tasks", id)
        await deleteDoc(taskDoc)
        await updatePage()
        toast('✔️ Task Removed', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-Complete'
        });
    }

    const compareFunc = (task1, task2) => {
        if (task2 == undefined) return 1
        if (task1.priorityValue > task2.priorityValue) return 1
        if (task1.priorityValue == task2.priorityValue) return 0
        else return -1
    }

    return (
        <div className='py-6 relative justify-center bg-[#0a0a0a]'>
            <div className='flex justify-center pb-6'>
                <select id='priorityBox' className='border-2 border-[#0f0] bg-[#0a0a0a] text-[#0f0]
                                                     hover:text-[#fff] transition-all duration-200 ease-out hover:border-[#fff]'>
                    <option value='1'>High</option>
                    <option value='2'>Medium</option>
                    <option value='3'>Low</option>
                </select>
                <input className='pr-2 pl-4 bg-[#131314] text-[#0f0] focus:border-2 border-[#0f0] placeholder-[#0f0] hover:placeholder-[#fff]'
                placeholder='Enter a task description' id='descBox'></input>
                <button className='p-2 text-[#0f0] border-2 hover:border-[#fff] transition-all duration-200 ease-out hover:text-[#fff]'
                    onClick={addNewTask}> Add Task </button>
            </div>
            {tasks.map((task, i) => (
                <Task 
                    key={i}
                    id={task.id}
                    description={task.description}
                    priority={task.priority}
                    complete={completeTask}
                    priorityValue={task.priorityValue}
                    edit={updateTask}
                    remove={deleteTask}
                    remove2={removeCompletedTask} />
            ))}
            <ToastContainer 
            theme='dark'
            autoClose={2000}
            hideProgressBar={true}/>
        </div>
    )
}

export default TaskList