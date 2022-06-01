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

  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // Filtrar título vazio
    if (!newTaskTitle){alert('Digite um nome válido')}
    // Cria um objeto com as mesmas configs da interface
    else {
      const newTaskCreation: Task = {
        id: getRndInteger(1, 99999999),
        title: newTaskTitle,
        isComplete: false,
      };
      // Quando em arrays, copia os estados antigos com o spread operator e adiciona o novo estado coletado
      setTasks(prevState => [...prevState, newTaskCreation])
      // Reseta o input space após os passos acima
      setNewTaskTitle('')
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toggledTask = tasks.map(task => task.id === id ? {
      // iremos pegar a task como spread e negaremos o valor do isComplete, isso soluciona o toggling, pois sempre irá setar o valor contrário do valor atual:
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(toggledTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // (O botão já está fazendo a função de passar como parâmetro o ID da task desejada, pois a UL já está mapeando o estado 'tasks')
    // A variável abaixo filtra e retorna todas as tasks onde a task.id seja diferente da que veio como parâmetro entregado pelo button:
    const filteredTasks = tasks.filter(task => task.id !== id);
    // Salvar de volta à um novo estado:
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

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