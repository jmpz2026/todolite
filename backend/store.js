// Datos en memoria: se pierden al reiniciar el backend.
let tasks = [];
let nextId = 1;

function list() {
  return tasks;
}

function create(title) {
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  return task;
}

function setDone(id, done) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.done = done;
  return task;
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

// Solo para las pruebas.
function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { list, create, setDone, remove, reset };
