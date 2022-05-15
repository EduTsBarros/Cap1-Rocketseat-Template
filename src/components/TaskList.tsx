import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setErros] = useState("");
  //gerando um valor randomico e usando expreções matemoticas para ficar ainda mais dificil de gerar iguais.
  var min = 1;
  var max = 100;
  var rand = min + Math.random() * (max - min);

  function handleCreateNewTask() {
    //if não for for passado nada para newTaskTitle iara passar direto

    if (newTaskTitle != "") {
      //Buscando se ja existe registro com o mesmo titulo no state tasks
      const validateTitle = tasks.find(
        (element) => element.title == newTaskTitle
      );

      //Verificação de duplicidade de task
      if (validateTitle) {
        setErros("Essa Task ja foi criada");
        return;
      }
      setTasks((taskss) => [
        ...taskss,
        { id: rand, title: newTaskTitle, isComplete: false },
      ]);
      setErros("");
    } else {
      setErros("Erro: Informe um texto para sua nova Task");
    }

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    const newtaskchecked = tasks.map((data) => {
      //Verifica se o id é o mesmo passado na chamada desta função e retorna o array com os resultados porem alterando o valor para aqueleque entrar no if
      if (data.id === id) {
        return { ...data, isComplete: !data.isComplete };
      } else {
        return data;
      }
    });

    //pode ser encurtada com um ternario tambem.
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    setTasks(newtaskchecked);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //utilizando o filter para gerar um retorno com apenas os id diferentes do que foi recebido no parametro  para poder setar novamente no state
    const removeTasks = tasks.filter((data) => data.id !== id);
    setTasks(removeTasks);
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
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <div className="erros">
          <p>{error}</p>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
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

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
