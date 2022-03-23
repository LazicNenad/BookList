const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const collection = document.querySelector('.collection');
const filterField = document.querySelector('#filter');
const clearBtn = document.querySelector('#clearBtn');

loadEvents();

function loadEvents() {
  // Dom Content
  document.addEventListener('DOMContentLoaded', addTaskFromLS);

  // Add the task
  form.addEventListener('submit', addTask);

  //Remove single task
  collection.addEventListener('click', removeTask);

  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);

  filterField.addEventListener('input', filterTasks);
}

function createElements(elementText) {
  // Create elements
  const li = document.createElement('li');
  li.classList.add('collection-item');
  li.appendChild(document.createTextNode(elementText));

  var link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);

  collection.appendChild(li);
}

function addTaskFromLS() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    createElements(task);
  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Field cannot be blank');
    return;
  }

  // Create elements
  createElements(taskInput.value);

  // Add to LS
  addTaskToLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

function addTaskToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }

  // Remove From LS
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem) {
  const text = taskItem.textContent;

  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (task === text) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  // collection.innerHTML = '';
  while (collection.firstChild) {
    collection.removeChild(collection.firstChild);
  }

  clearFromLocalStorage();
}

function clearFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  var collectionItems = document.querySelectorAll('.collection-item');

  collectionItems.forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
