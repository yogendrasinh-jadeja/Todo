window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameinput = document.getElementById("name");
  const newtodoform = document.getElementById("new-todo-form");
  const username = localStorage.getItem("username") || "";
  nameinput.value = username;
  nameinput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  })
  newtodoform.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdate: new Date().getTime(),
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();
    displaytodos();
  })
  displaytodos();
})
function displaytodos() {
  const todolist = document.querySelector("#todo-list");
  todolist.innerHTML = "";
  todos.forEach((todo) => {
    const todoitem = document.createElement("div");
    todoitem.classList.add("todo-item");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deletebutton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("action");
    edit.classList.add("edit");
    deletebutton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deletebutton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deletebutton);
    todoitem.appendChild(label);
    todoitem.appendChild(content);
    todoitem.appendChild(actions);
    todolist.appendChild(todoitem);

    if (todo.done) {
      todoitem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        todoitem.classList.add("done");
      } else {
        todoitem.classList.remove("done");
      }
      displaytodos();
    })

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displaytodos();
      })
    })
      deletebutton.addEventListener('click',(e)=>{
        todos=todos.filter(t=> t!=todo)
        localStorage.setItem("todos", JSON.stringify(todos));
        displaytodos();
      })   
  })
}
