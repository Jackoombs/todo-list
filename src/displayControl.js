import projectControl from './project.js'
import buttonLogic from './buttonLogic.js'


const displayControl  = () => {
  const main = document.querySelector('main')
  const projectList = document.querySelector('.projectList')

  const initDisplay = () => {
    if (projectControl.getAllProjects.length < 1) {
      new projectControl.Project('My First Project')
      new projectControl.Todo('My First Task', `Create a new project by clicking the 'New Project' button.`, 'Now!', false)
    } 
    const initProject = projectControl.getProject(0)
    const initTodo = initProject.todos[0]
    projectControl.createTodoCard(initTodo)
    toggleActiveListItem(initProject)
    buttonLogic.initButtons()
  }

  const updateDisplay = (project) => {
    displayProject(project)
    displayTodos(project)
    projectControl.updateActiveProject(project)
  }

  const displayProject = (project) => {
    const projectTitle = document.createElement('h2')
    projectTitle.textContent = project.title
    const removeProjectButton = document.createElement('button')
    removeProjectButton.innerHTML = '<i class="fa-solid fa-trash-can fa-2x"></i>'
    buttonLogic.removeProjectClick(removeProjectButton)
    const titleContainer = document.createElement('div')
    titleContainer.className = 'titleContainer'
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todoContainer')

    main.innerHTML = ''
    titleContainer.appendChild(projectTitle)
    titleContainer.appendChild(removeProjectButton)
    main.appendChild(titleContainer)
    main.appendChild(todoContainer)
  }

  const displayTodos = (project) => {
    if (project.todos.length > 0) {
      for (const todo of project.todos)
        projectControl.createTodoCard(todo)
    }
  }

  const displayProjectListItem = (project) => {
    const listItem = document.createElement('li')
    listItem.textContent = project.title
    listItem.setAttribute('dataset-id', project.id)
    projectList.appendChild(listItem)
    buttonLogic.addItemClick(listItem)
  }

  const removeProjectListItem = (project) => {
    const listItems = document.querySelectorAll('li')
      listItems.forEach(listItem => {
        if (project.id === +listItem.getAttribute('dataset-id')){
          listItem.remove()
        }
      });
  }

  const toggleActiveListItem = (project) => {
    const listItem = document.querySelector(`[dataset-id="${project.id}"]`)
    if (listItem) listItem.classList.toggle('active')
  }

  const toggleModal = (modal) => {
    modal.classList.toggle('hide')
  }

  return{
    initDisplay,
    displayProjectListItem,
    removeProjectListItem,
    toggleModal,
    toggleActiveListItem,
    updateDisplay
  }
}

export default displayControl()