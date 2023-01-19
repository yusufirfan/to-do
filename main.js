const btn = document.querySelector(".btn");
const input = document.querySelector(".inp");
const todos = document.querySelector(".todos")
const done1 = document.querySelector(".done");
const progress1 = document.querySelector(".progress");
let done = 0;


let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
    getTodo();

})
function getTodo() {
    todoList.forEach(todo => {
        const { id, completed, value } = todo;
        let comple = "uncheck";
        if (completed == true) {
            comple = "checked"
        }
        add(value, id, comple);
    });
    updateAreas();
};


btn.addEventListener("click", () => {
    let todo = input.value;
    if(input.value.trim() == ""){
        alert("Please enter a text.")
        return;
    }
    const todos = {
        id: new Date().getTime(),
        completed: false,
        value: todo,
    }
    const { id, completed, value } = todos;
    todoList.push(todos);
    add(value, id);
    updateLS();
    updateAreas();
    input.value = "";
})


function add(todo, id, completed) {
    todos.innerHTML += html(todo, id, completed);

}

function updateLS() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function updateAreas() {
    let d = 0;
    let i = 0;
    for (let j = 0; j < todoList.length; j++) {
        if (todoList[j].completed == true) {
            i++;
        }
        else if (todoList[j].completed == false) {
            d++;
        }
    }
    progress1.innerHTML = d;
    done1.innerHTML = i;
}


function html(value, prog, comp) {
    return (`<div class="todo ${prog} ${comp}" id="${prog}">
                <p>${value}</p>
                <div class="todo-icons" id="${prog}">
                    <i class="fa-solid fa-trash "></i>
                    <i class="fa-solid fa-check"></i>
                </div>
            </div>`)
}

todos.addEventListener("click", (e) => {
    const id = e.target.closest("div").getAttribute("id");
    // console.log(id);

    if (e.target.classList.contains("fa-trash")) {
        todoList = todoList.filter((todo) => todo.id != id);
        updateLS(todoList);
        e.target.parentElement.parentElement.remove();
        updateAreas();

    }
    else if (e.target.classList.contains("fa-check")) {
        const p = e.target.parentElement.parentElement.querySelector(".todo p");
        const div = e.target.parentElement.parentElement;
        div.classList.toggle("checked");
        todoList.forEach((todo) => {
            if (todo.id == id) {
                todo.completed = !todo.completed;
            }
        });
        updateLS(todoList);
        updateAreas();
    }
})