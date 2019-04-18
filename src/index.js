import 'bootstrap';
import _ from 'lodash';


//will be imported
const projectList = [];
//can be default to start - variable that determines what to do items show up
let currentProject = projectList[0];



document.getElementById('toggleProjectButton').addEventListener('click', function(){
      
    document.getElementById("sidebar").classList.toggle("hide")
  
  
});

document.getElementById("newProjectButton").addEventListener('click', function(){


    document.getElementById("projectInput").classList.toggle("hide")
    document.getElementById("projectNameInput").focus();


});

document.getElementById("projectNameInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addProjectButton").click();
    }
});

document.getElementById("todoDescriptionInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addTodoButton").click();
    }
});


document.getElementById("newTodoButton").addEventListener('click', function(){


    document.getElementById("todoInput").classList.toggle("hide")
    document.getElementById("addTodoButton").classList.toggle("hide")
    document.getElementById("todoTitleInput").focus();


});

document.getElementById("todoNotesInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addTodoButton").click();
    }
});

document.getElementById("addProjectButton").addEventListener('click', function(){

    
    addProject();


});


//adding todos to projects
document.getElementById("addTodoButton").addEventListener('click', function(){

    
    addTodo();
    todoFormButtonReset();


});

function todoFormButtonReset(){
    document.getElementById("todoTitleInput").value = "";
    document.getElementById("todoDuedateInput").value = "";
    document.getElementById("mediumPriorityRadio").checked = true;
    document.getElementById("todoDescriptionInput").value = "";
    document.getElementById("todoNotesInput").value = "";
    document.getElementById("todoInput").classList = "hide";
}

function addProject (){

    //get name from input
    name = document.getElementById("projectNameInput").value


    let todoList = []
    let project = createProject(name, todoList)
    storeProject(project)
    updateDomProjects(project)

    

}

function updateDomProjects(project){

    let newDiv = document.createElement('div')
    newDiv.className = "project";
    newDiv.innerHTML = project.name;
    newDiv.addEventListener('click', function(){
        updateDomTodoItems(project);
    });
    document.getElementById("projectsList").appendChild(newDiv)

    document.getElementById("projectInput").classList.toggle("hide")
    document.getElementById("projectNameInput").value = "";

}

function addTodo (){

    //get information from form
    let title = document.getElementById("todoTitleInput").value
    let description = document.getElementById("todoDescriptionInput").value
    let dueDate = document.getElementById("todoDuedateInput").value
    let priority = "";

    if (document.getElementById('lowPriorityRadio').checked) {
        priority = "low";
    }
    else if (document.getElementById('mediumPriorityRadio').checked) {
        priority = "medium";
    }
    else if (document.getElementById('highPriorityRadio').checked) {
        priority = "high";
    }

    let notes = document.getElementById("todoNotesInput").value

    let newTodo = createTodo(title, description, dueDate, priority, notes);
    currentProject.todoList.push(newTodo);
    console.log(newTodo);
    updateDomTodoItems(currentProject);

}

function editTodo(todo){

    document.getElementById("todoInput").classList.toggle("hide");
    document.getElementById("editTodoButton").classList.toggle("hide");
    document.getElementById("todoTitleInput").focus();

    document.getElementById("todoTitleInput").value = todo.title
    document.getElementById("todoDescriptionInput").value = todo.description
    document.getElementById("todoDuedateInput").value = todo.dueDate

    if (todo.priority == "low") {
        document.getElementById('lowPriorityRadio').checked = true;
    }
    else if (todo.priority == "medium") {
        document.getElementById('mediumPriorityRadio').checked = true;
    }
    else if (todo.priority = "high") {
        document.getElementById('highPriorityRadio').checked = true
    } 

    
    document.getElementById("editTodoButton").addEventListener("click", function(){

        todo.title = document.getElementById("todoTitleInput").value
        todo.description = document.getElementById("todoDescriptionInput").value
        todo.dueDate = document.getElementById("todoDuedateInput").value
        
        if (document.getElementById('lowPriorityRadio').checked) {
            todo.priority = "low";
        }
        else if (document.getElementById('mediumPriorityRadio').checked) {
            todo.priority = "medium";
        }
        else if (document.getElementById('highPriorityRadio').checked) {
            todo.priority = "high";
        }


        updateDomTodoItems(currentProject);

        document.getElementById("todoInput").classList.toggle("hide");
        document.getElementById("editTodoButton").classList.toggle("hide"); 

    })


}

function updateDomTodoItems(currentProject){

    let wrapper = document.getElementById("todoItems");
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    for (var i = 0; i<currentProject.todoList.length; i++){

        let newTodo = currentProject.todoList[i]
        let container = document.createElement('div');
        container.className = "container todoItem"

        let title = newTodo.title
        let description = newTodo.description
        let dueDate = newTodo.dueDate
        let priority = newTodo.priority
        let notes = newTodo.notes

        let primary = document.createElement('div');
        primary.className = 'row';
        let additional = document.createElement('div');
        additional.className = 'row hide extra';


        let titleDom = document.createElement('span');
        titleDom.className = "itemTitle col";
        let descriptionDom = document.createElement('span');
        descriptionDom.className = "itemDescription col-12";
        let dueDateDom = document.createElement('span');
        dueDateDom.className = "itemDueDate col-2";
        let priorityDom = document.createElement('span');
        let notesDom = document.createElement('span');
        notesDom.className = "itemNotes col";

        titleDom.innerHTML = title
        descriptionDom.innerHTML = description
        dueDateDom.innerHTML = dueDate
        priorityDom.className = "dot"

        priorityDom.addEventListener('click', function(){

            //should gray out the text/show checkmark

            titleDom.classList.toggle("complete"); 
            descriptionDom.classList.toggle("complete"); 
            dueDateDom.classList.toggle("complete"); 
            notesDom.classList.toggle("complete");
            priorityDom.classList.toggle("finishedPriority")

        });

        priorityDom.addEventListener('dblclick', function(){

            //opens edit - should open the menu to edit stuff, and then give this item as the editable thing
            console.log("double click")
            console.log(newTodo)

            editTodo(newTodo)




        });

        if (priority == "low"){
            priorityDom.className = priorityDom.className + " lowPriority"
        }
        if (priority == "medium"){
            priorityDom.className = priorityDom.className + " mediumPriority"
        }
        if (priority == "high"){
            priorityDom.className = priorityDom.className + " highPriority"
        }

        notesDom.innerHTML = notes

        titleDom.addEventListener('click', function(){additional.classList.toggle("hide")});


        primary.appendChild(priorityDom);
        primary.appendChild(titleDom);
        primary.appendChild(dueDateDom);

        additional.appendChild(descriptionDom);
        additional.appendChild(notesDom);

        container.appendChild(primary);
        container.appendChild(additional);

        wrapper.appendChild(container);
    }

}

const createProject = (name, todoList) => ({

    
    name,
    todoList


});

const createTodo = (title, description, dueDate, priority, notes) => ({

    title,
    description,
    dueDate,
    priority,
    notes

});

const storeProject = (project) => {

    projectList.push(project);
    console.log(projectList);
    currentProject = projectList[projectList.length - 1];

};

function defaultProjectList(){

    let project = createProject("Default", [])
    storeProject(project)
    updateDomProjects(project)
    currentProject.todoList.push(createTodo("Getting Started", "Just click add project to create a project", "today!", "low", ""));
    updateDomTodoItems(currentProject);

}

defaultProjectList();