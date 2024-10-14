import React, { useState } from "react";
import '../styles/Todo.scss';

interface Task{
    id:number,
    task_text:string,
    completed:boolean
}

export default function Todo(){
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState("")

    const addTask = (e:React.FormEvent) =>{
        e.preventDefault()
        if(newTask.trim()){
            setTasks([...tasks,{id:Date.now(),task_text:newTask,completed:false}])
            setNewTask("")
        }
        console.log(tasks)
    }
    
    const deleteTask = (id:number) =>{
        setTasks(tasks.filter(task => task.id !== id))
    }   

    const doneTask = (id:number) => {
        setTasks(tasks.map(task => task.id === id ? {...task,completed: !task.completed} : task))
    }
    return (
        <>
            <div className="todo py-20">
                <h1 className="text-white flex justify-center text-3xl">TODO</h1>
                <form action="" onSubmit={addTask} className="text-center pt-10 "> 
                    <input type="text" 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="rounded-lg p-2 bg-gray-700 text-white"
                    />
                    <button className="btn button text-white p-2 rounded-lg bg-gray-700 ml-3" type="submit">Add Task</button>
                </form>
                <ul className="flex  flex-col items-center pt-5  ">
                    {tasks.map(task =>(
                        <li className="text-white items-center flex  justify-between task">
                            <span className=""> 

                                <input type="checkbox" 
                                        onClick={() => doneTask(task.id)} 
                                        checked={task.completed}
                                        />
                                <span className={`${task.completed ? 'line-through' : ''  } pl-2`}>{task.task_text}</span> 
                            </span> 
                            
                            <span onClick={() => deleteTask(task.id)}><i className="fa-regular fa-trash-can cursor-pointer "></i></span>
                            </li>
                        
                    ))   }
                </ul>
               

             
            </div>
        </>
    )
}