const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
  // 새로운 item 객체 생성
  const item = {
    id: new Date().getTime(),
    text: '',
    complete:false
  }

  // 배열 처음에 새로운 아이템 추가
  todos.unshift(item);

  // 요소 생성
  const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);

  // 리스트 요소 안에 item 요소 추가
  list.prepend(itemEl);

  inputEl.removeAttribute('disabled');
  inputEl.focus();

  saveToLocalStorage();
}

function createTodoElement(item) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  checkboxEl.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add('complete');
  }

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = item.text;
  inputEl.setAttribute('disabled','');

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('actions');

  const editBtnEl = document.createElement('button');
  editBtnEl.classList.add('material-icons');
  editBtnEl.innerText = 'edit';

  const removeBtnEl = document.createElement('button');
  removeBtnEl.classList.add('material-icons', 'remove-btn');
  removeBtnEl.innerText = 'remove_circles';

  checkboxEl.addEventListener('change',() => {
    item.complete = checkboxEl.checked;
    if (item.complete) {
      itemEl.classList.add('complete');
    } else {
      itemEl.classList.remove('complete');
    }
    saveToLocalStorage();
  })

  inputEl.addEventListener('input', () => {
    item.text = inputEl.value;
  })

  inputEl.addEventListener('blur', () => {
    inputEl.setAttribute('disabled', '');
    saveToLocalStorage();
  })

  editBtnEl.addEventListener('click', () => {
    inputEl.removeAttribute('disabled');
    inputEl.focus();
  })

  removeBtnEl.addEventListener('click',() => {
    todos.filter(t => t.id != item.id);
    // 클릭한 요소는 필터링 되고 다른 item들만 todos 배열에 반환됨
    itemEl.remove();
    saveToLocalStorage();
  })

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);
  itemEl.append(checkboxEl);
  itemEl.append(inputEl);

  itemEl.append(actionsEl);

  return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveToLocalStorage() {
  const data = JSON.stringify(todos);

  window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('my_todos');

  if (data) {
    todos = JSON.parse(data);
  }
}

function displayTodos(){
  loadFromLocalStorage();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
      const{itemEl} = createTodoElement(item);

      list.append(itemEl);
  }
}

displayTodos();