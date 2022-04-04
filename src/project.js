import buttonLogic from "./buttonLogic";
import displayControl from "./displayControl";

const projectControl = () => {
  let projects = []
  let projectId = 0;
  let activeProject = ''

  class Project {
    constructor(title) {
      this.title = title;
      this.todos = []
      this.id = projectId++
      projects.push(this)
      displayControl.displayProjectListItem(this)
      displayControl.updateDisplay(this)
    };
  }

  class Todo {
    constructor(task, description, dueDate, priority) {
      this.task = task;
      this.description = description
      this.dueDate = dueDate
      this.priority = priority
      this.isDone = false
      activeProject.todos.push(this)
    }
  }

  const createTodoCard = (Todo) => {
    const task = document.createElement('h3')
    const description = document.createElement('p')
    const dueDate = document.createElement('h4')
    const isDone = document.createElement('button')

    task.innerHTML = Todo.task
    description.innerHTML = Todo.description
    dueDate.innerHTML = `Due: ${Todo.dueDate}`
    isDone.innerHTML = `<i class="fa-regular fa-circle-check fa-3x" ></i>`
    buttonLogic.taskFinishedClick(isDone)

    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(task)
    card.appendChild(description)
    card.appendChild(dueDate)
    card.appendChild(isDone)
    const todoContainer = document.querySelector('.todoContainer')
    todoContainer.appendChild(card)
  }

  const getAllProjects = () => {
    return projects
  }

  const getProject = (projectID) => {
    for (const project of projects) {
      if (project.id === projectID) return project
    }
  }

  const removeProject = (nullProject) => {
    projects.forEach((project, index) => {
      if (nullProject.id === project.id)
        projects.splice(index, 1)
    })
    displayControl.removeProjectListItem(nullProject)
    if (projects.length > 1) {
      displayControl.updateDisplay(projects[0])
    } else document.querySelector('main').innerHTML= ''
  }

  const getActiveProject = () => {
    return activeProject
  }

  const updateActiveProject = (project) => {
    if (activeProject === '') activeProject = projects[0]
    displayControl.toggleActiveListItem(activeProject)
    activeProject = project
    displayControl.toggleActiveListItem(activeProject)
  }

  return{
    Project,
    Todo,
    getAllProjects,
    getProject,
    removeProject,
    getActiveProject,
    updateActiveProject,
    createTodoCard
  }
}

export default projectControl()