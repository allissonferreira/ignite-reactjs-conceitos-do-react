import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateNewTask = () => {
    const newTask = {
      id: 0,
      title: '',
      isComplete: false
    };

    if (newTaskTitle === '') {
      alert('Por favor, insira um título.');
      return;
    }

    newTask.id = generateNewId();
    newTask.title = newTaskTitle;

    setTasks([...tasks, newTask]);
  }

  const handleToggleTaskCompletion = (id: number) => {
    const index = findTaskIndexById(id);

    tasks[index].isComplete = !tasks[index].isComplete;

    setTasks([...tasks]);
  }

  const handleRemoveTask = (id: number) => {
    const index = findTaskIndexById(id);

    tasks.splice(index, 1);

    setTasks([...tasks]);
  };

  const generateNewId = () => {
    return new Date().getTime();
  };

  const findTaskIndexById = (id: number) => tasks.findIndex(function(task: Task){
    return task.id === id;
  });

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}