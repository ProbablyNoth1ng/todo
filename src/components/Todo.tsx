import React, { useEffect, useState } from "react";
import '../styles/Todo.scss';

interface Task{
    id:number,
    task_title:string,
    task_description:string,
    completed:boolean,
    folded:boolean
}

export default function Todo(){
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState("")
    const [newTaskDescription,setNewTaskDescription] = useState("");

    const addTask = (e:React.FormEvent) =>{
        e.preventDefault()
        if(newTask.trim()){
            setTasks([...tasks,{id:Date.now(),task_title:newTask,task_description:newTaskDescription,completed:false,folded:true}])
            setNewTask("")
        }
        console.log(tasks)
    }
    const foldTask = (id:number) =>{
        setTasks(tasks.map(task => task.id === id ? {...task,folded:!task.folded} : task))
    }
    const deleteTask = (id:number) =>{
        setTasks(tasks.filter(task => task.id !== id))
    }   

    const doneTask = (id:number) => {
        setTasks(tasks.map(task => task.id === id ? {...task,completed: !task.completed} : task))
    }
    useEffect(() =>{
        console.log(tasks.map(task => {
            console.log(task.folded)
        }))
    },[tasks])
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
                        
                        <li className="text-white items-center task" >
                            <div className=" flex  justify-between">
                                <span className=""> 
                       
                                <input type="checkbox" 
                                        onClick={() => doneTask(task.id)} 
                                        checked={task.completed}
                                        />
                                <span className={`${task.completed ? 'line-through' : ''  } pl-2`}>{task.task_title}</span> 
                                </span> 
                        <span>
                            <span onClick={() => deleteTask(task.id)}><i className="fa-regular fa-trash-can cursor-pointer mr-2 "></i></span>
                            <span onClick={() => foldTask(task.id)}>{task.folded ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i> }</span>
                        </span>
                               
                            </div>
                           
                            <div className={`task_description ${task.folded ? "hidden" : ''} `}>
                                    <textarea 

                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    placeholder="Enter a new description"
                                    className="textarea rounded-lg p-5 bg-gray-100 text-white w-full mt-2 text-black"
                                    />
                            </div>
                        </li>
                        
                    ))   }
                </ul>
               

             
            </div>
        </>
    )
}