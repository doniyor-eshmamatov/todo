let elForm = document.querySelector('.js-form');
let todo = document.querySelector('.js-todo');
let elList = document.querySelector('.result-list');
let elAll = document.querySelector('.all');
let elComplated = document.querySelector('.complated');
let elUnComplated = document.querySelector('.uncomplated');


function render(array, node) {
    node.innerHTML = '';

    array.forEach(item => {
        let elLi = document.createElement('li');
        elLi.setAttribute('class', 'js-li list-group-item d-flex align-items-center');

        let elCheck = document.createElement('input');
        elCheck.type = 'checkbox';
        elCheck.setAttribute('class', 'form-check-input me-3 js-check');
        elCheck.dataset.todoId = item.id
        elLi.appendChild(elCheck);

        let elText = document.createElement('span');
        elText.setAttribute('class', 'flex-grow-1 item-text')
        elText.dataset.todoId = item.id;
        elText.textContent = item.text;
        elLi.appendChild(elText);

        let elEdit = document.createElement('button');
        elEdit.dataset.todoId = item.id;
        elEdit.setAttribute('class', 'btn btn-warning edit-btn me-2');
        elEdit.textContent = 'Edit';
        elLi.appendChild(elEdit);

        let elRemove = document.createElement('button');
        elRemove.dataset.todoId = item.id;
        elRemove.setAttribute('class', 'btn btn-danger remove-btn');
        elRemove.textContent = 'Remove';
        elLi.appendChild(elRemove);

        if (item.isComplated) {
            elCheck.checked = true;
            elText.style.textDecoration = 'line-through';
        }


        node.appendChild(elLi)
    });
}

let todos = [];

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    todos.push(
        {
            id: todos.length > 0 ? todos.length + 1 : 1,
            text: todo.value,
            isComplated: false,
        }
    )

    elAll.textContent = todos.length;
    render(todos, elList);
    todo.value = '';
})

elList.addEventListener('click', (evt) => {
    if (evt.target.matches('.remove-btn')) {
        let todoId = evt.target.dataset.todoId;
        let findedIndex = todos.findIndex((item) => item.id == todoId);
        
        todos.splice(findedIndex, 1)
        render(todos, elList);
    }

    if (evt.target.matches('.edit-btn')) {
        let todoId = evt.target.dataset.todoId;
        let findedIndex = todos.find((item) => item.id == todoId);

        let newItem = prompt('Edit Todo', findedIndex.text)
        
        findedIndex.text = newItem;
        render(todos, elList);
    }

    if (evt.target.matches('.js-check')) {
        let todoId = evt.target.dataset.todoId;
        let findedIndex = todos.find((item) => item.id == todoId);
        let countComplated = todos.filter(item => item.isComplated == true);

        findedIndex.isComplated = !findedIndex.isComplated;
        if (findedIndex.isComplated == true) {
            elComplated.textContent = countComplated.length +1;
            elUnComplated.textContent = todos.length - countComplated.length - 1;
        }

        render(todos, elList);
    }
})


