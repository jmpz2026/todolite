const { test, beforeEach } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');
const store = require('../store');

beforeEach(() => {
  store.reset();
});

test('POST /api/tasks crea una tarea', async () => {
  const res = await request(app).post('/api/tasks').send({ title: 'Comprar pan' });

  assert.strictEqual(res.status, 201);
  assert.deepStrictEqual(res.body, { id: 1, title: 'Comprar pan', done: false });
});

test('POST /api/tasks con título vacío responde 400', async () => {
  const vacio = await request(app).post('/api/tasks').send({ title: '' });
  const espacios = await request(app).post('/api/tasks').send({ title: '   ' });
  const sinTitulo = await request(app).post('/api/tasks').send({});

  assert.strictEqual(vacio.status, 400);
  assert.strictEqual(espacios.status, 400);
  assert.strictEqual(sinTitulo.status, 400);
  assert.deepStrictEqual(store.list(), []);
});

test('GET /api/tasks devuelve las tareas creadas', async () => {
  await request(app).post('/api/tasks').send({ title: 'Una' });
  await request(app).post('/api/tasks').send({ title: 'Dos' });

  const res = await request(app).get('/api/tasks');

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body.map((t) => t.title), ['Una', 'Dos']);
});
