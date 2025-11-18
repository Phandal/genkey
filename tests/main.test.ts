import { it } from 'node:test';
import assert from 'node:assert';

import { hello } from '../src/main';

it('simple test', () => {
  assert.strictEqual(hello(), 1);
})
