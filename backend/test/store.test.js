const { test, beforeEach } = require('node:test');
const assert = require('node:assert');
const store = require('../store');

beforeEach(() => {
  store.reset();
});

test('list() empieza vacío', () => {
  assert.deepStrictEqual(store.list(), []);
});

test('create() agrega una tarea sin completar y con id incremental', () => {
  const a = store.create('Comprar pan');
  const b = store.create('Lavar ropa');

  assert.deepStrictEqual(a, { id: 1, title: 'Comprar pan', done: false });
  assert.strictEqual(b.id, 2);
  assert.strictEqual(store.list().length, 2);
});

test('setDone() marca y desmarca una tarea', () => {
  const task = store.create('Estudiar');

  assert.strictEqual(store.setDone(task.id, true).done, true);
  assert.strictEqual(store.setDone(task.id, false).done, false);
});

test('setDone() devuelve null si la tarea no existe', () => {
  assert.strictEqual(store.setDone(99, true), null);
});

test('remove() elimina la tarea', () => {
  const task = store.create('Borrar esta');

  assert.strictEqual(store.remove(task.id), true);
  assert.deepStrictEqual(store.list(), []);
});

test('remove() devuelve false si la tarea no existe', () => {
  assert.strictEqual(store.remove(99), false);
});

test('reset() vacía el arreglo y reinicia los ids', () => {
  store.create('Una');
  store.reset();

  assert.deepStrictEqual(store.list(), []);
  assert.strictEqual(store.create('Otra').id, 1);
});
