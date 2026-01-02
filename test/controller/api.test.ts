import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('test/controller/api.test.ts', () => {
  it('should POST /api/get_user', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get('/api/get_user').query({ uid: 123 });

    // use node assert
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.body.message, 'OK');

    // close app
    await close(app);
  });
});
