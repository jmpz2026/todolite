const { test } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');

test('GET /api/health responde 200 con status ok', async () => {
  const res = await request(app).get('/api/health');

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, { status: 'ok' });
});
