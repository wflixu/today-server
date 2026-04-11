import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('test/controller/home.test.ts', () => {
  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get('/');

    // use node assert
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.text, 'Hello Midwayjs!');

    // close app
    await close(app);
  });
});
