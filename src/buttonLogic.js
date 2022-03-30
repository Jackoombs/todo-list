import displayControl from "./displayControl";
import projectControl from './project.js'

const buttonLogic = () => {

  const initButtons = () => {
    newItemButtons()
    modalExit()
    submitNewProject()
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
      const input = document.getElementById('projectInput')
      const project = new projectControl.Project(input.value)
      displayControl.displayProject(project)
      displayControl.toggleModal(e.target.parentElement)
      form.reset();
    })
  }

  const addItemClick = (item) => {
    item.addEventListener('click', (e) => {
      const index = e.target.getAttribute('dataset-index')
      const project = projectControl.getProject(index)
      displayControl.displayProject(project)
    })
  }

  return {
    initButtons,
    addItemClick
  }
}

export default buttonLogic()