import displayControl from "./displayControl";
import projectControl from './project.js'

const buttonLogic = () => {

  const initButtons = () => {
    newItemButtons()
    modalExit()
    submitNewProject()
    submitNewTask()
  }

  const newItemButtons = () => {
    const newItemButtons = document.querySelectorAll('.newItem')
    newItemButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (e.target.getAttribute('id') === 'newProject') {
          displayControl.toggleModal(document.querySelector('#projectModal'))
        } else displayControl.toggleModal(document.querySelector('#todoModal'))
      })
    });
  }

  const modalExit = () => {
    const modals = document.querySelectorAll('.modal')
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal'))  displayControl.toggleModal(e.target)
      })
    });
  }

  const submitNewProject = () => {
    const form = document.querySelector('.projectForm')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const title = document.getElementById('projectInput').value
      const project = new projectControl.Project(title)
      displayControl.updateDisplay(project)
      displayControl.toggleModal(e.target.parentElement)
      form.reset();
    })
  }

  const submitNewTask = () => {
    const form = document.querySelector('.modalForm')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const task = document.getElementById('task').value
      const description = document.getElementById('description').value
      const dueDate = document.getElementById('dueDate').value
      const priority = document.getElementById('urgent').checked
      const todo = new projectControl.Todo(task, description, dueDate, priority)
      projectControl.createTodoCard(todo)
      displayControl.toggleModal(e.target.parentElement)
      form.reset();
    })
  }

  const addItemClick = (item) => {
    item.addEventListener('click', (e) => {
      const id = Number(e.target.getAttribute('dataset-id'))
      const project = projectControl.getProject(id)
      displayControl.updateDisplay(project)
    })
  }

  const removeProjectClick = (button) => {
    button.addEventListener('click', () => {
      const project = projectControl.getActiveProject()
      projectControl.removeProject(project)
    })
  }

  const taskFinishedClick = (button) => {
    button.addEventListener('click', () => {
      button.parentElement.classList.toggle('taskComplete')
    })
  }

  return {
    initButtons,
    addItemClick,
    submitNewTask,
    taskFinishedClick,
    removeProjectClick
  }
}

export default buttonLogic()