import displayControl from "./displayControl";

const projectControl = () => {
  let projects = []
  let projectId = 0;
  let activeProject = 0

  class Project {
    constructor(title) {
      this.title = title;
      this. todos = []
      this.id = projectId++
      projects.push(this)
      displayControl.addToProjectList(this)
      console.log(projects)
    };
  }

  const getAllProjects = () => {
    return projects
  }

  const getProject = (index) => {
    return projects[index]
  }

  const UpdateActiveProject = () => {
    
  }

  return{
    Project,
    getAllProjects,
    getProject
  }
}

const todo = (task, description, dueDate, priority, done) => {
  return {task, description,dueDate, priority, done}
}

export default projectControl()