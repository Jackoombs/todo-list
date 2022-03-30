import projectControl from './project.js'
import buttonLogic from './buttonLogic.js'

const displayControl  = () => {
  const main = document.querySelector('main')
  const projectList = document.querySelector('.projectList')

  const initDisplay = () => {
    if (projectControl.getAllProjects.length < 1) new projectControl.Project('My First Project')
    const initProject = projectControl.getProject(0)
    displayProject(initProject)
    buttonLogic.initButtons()
  }

  const displayProject = (project) => {
    const projectTitle = document.createElement('h2')
    projectTitle.textContent = project.title
    main.innerHTML = ''
    main.appendChild(projectTitle)
  }

  const addToProjectList = (project) => {
    const listItem = document.createElement('li')
    listItem.textContent = project.title
    listItem.setAttribute('dataset-index', project.id)
    projectList.appendChild(listItem)
    buttonLogic.addItemClick(listItem)
  }

  const toggleModal = (modal) => {
    modal.classList.toggle('hide')
  }

  return{
    initDisplay,
    displayProject,
    addToProjectList,
    toggleModal
  }
}

export default displayControl()