import { useState } from 'react'
import './App.css'
import githubIcon from './assets/github-mark-white.svg';
import { regularTask, timedTask, Task} from './classes/TaskFactory'
import { context, AlphabeticalStrategy, ChronologicalStrategy, TimeLeftStrategy, DoneStrategy } from './classes/Strategy'

function App() {
  const [countRegular, setCountRegular] = useState(1);
  const [countTimed, setCountTimed] = useState(1);
  const [countTotal, setCountTotal] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  function incrementTaskCount() : void {
    setCountTotal((countTotal) => countTotal + 1);
  }

  const createRegularTask = (id: string, name: string, description: string, status: boolean, nbrStatus : number, date: Date) => {
    setCountRegular((countRegular) => countRegular + 1)
    incrementTaskCount();
    const task = regularTask.createTask(id,name, description, status, nbrStatus, date);
    console.log(task);
    setTasks((prevTasks) => [...prevTasks, task]);
    return task;
  }

  const createTimedTask = (id: string, name: string, description: string, status: boolean, nbrStatus : number, date: Date, timeLeft: number) => {
    setCountTimed((countTimed) => countTimed + 1)
    incrementTaskCount();
    const task = timedTask.createTask(id,name, description, status, nbrStatus, date, timeLeft);
    console.log(task);
    setTasks((prevTasks) => [...prevTasks, task]);
    return task;
  }

  function setAsDone(task: Task) : void {
    task.status = !task.status;
    
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    setTasks(newTasks);
  }

  function sortTasksByAlphabeticalOrder(tasks: Task[]) : Task[] {
    context.setStrategy(new AlphabeticalStrategy());
    context.executeStrategy(tasks);
    return tasks;
  }

  function sortTasksByChronologicalOrder(tasks: Task[]) : Task[] {
    context.setStrategy(new ChronologicalStrategy());
    context.executeStrategy(tasks);
    return tasks;
  }

  function sortTasksByTimeLeft(tasks: Task[]) : Task[] {
    context.setStrategy(new TimeLeftStrategy());
    context.executeStrategy(tasks);
    return tasks;
  }

  function sortTasksByDone(tasks: Task[]) : Task[] {
    context.setStrategy(new DoneStrategy());
    context.executeStrategy(tasks);
    return tasks;
  }

  return (
    <>
      <div className='Header'>
        <h1>CollabTaskManager 📌</h1>
        <p>Gestionnaire de taches collaboratif</p>
      </div>
      <div className="taskmanager">
        {/*Changer la méthode pour essayer les autres stratégies de tri ci dessous*/}
        {sortTasksByDone(tasks).map((task) => (
          <div className="task" key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>{task.status ? "Terminé" : "En cours"}</p>
            <p>Créée le : {task.date.toLocaleString()}</p>
            {task.timeLeft ? <p>Temps restant : {task.timeLeft} min</p> : null}
            {task.status ? <button onClick={() => setAsDone(task)}>Marquer comme non terminé ❌ </button> : <button onClick={() => setAsDone(task)}>Marquer comme terminé ✅ </button>}
          </div>
        ))}
      </div>
      <div className='btns-div'>
        <button className='regularTaskBtn' onClick={() => createRegularTask(`${countTotal}`, `New Regular task ${countRegular}`, `New Regular description ${countRegular}`, false, 0, new Date())}>
            Créer une tache simple 📝
        </button>

        <button className='timedTaskBtn' onClick={() => createTimedTask(`${countTotal}`, `New Timed task ${countTimed}`, `New Timed description ${countTimed}`, false, 0, new Date(), 30)}>
            Créer une tache minutée ⏱️
        </button>
      </div>

      <div className='footer'>
        <a href="https://github.com/Enzoait/CollabTaskManager"><img src={githubIcon} alt="githubIcon"/></a>
        <p>Crée par <a href='https://github.com/Enzoait' target='_blank'>Enzoait</a>.</p>
      </div>
    </>
  )
}

export default App
