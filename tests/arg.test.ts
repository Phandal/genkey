import { describe, it } from 'node:test';
import assert from 'node:assert';

import { Arg, MissingArgumentError, parse, UnexpectedArgumentError } from '../src/arg'

describe('arg module', () => {
  it('should parse the arguments', () => {
    const got = parse(['kind', 'client', 'carrier']);
    const want: Arg = { kind: 'kind', client: 'client', carrier: 'carrier' };

    assert.deepEqual(got, want);
  });

  it('should throw if there are too few arguments', () => {
    const want = MissingArgumentError;

    assert.throws(() => parse([]), want);
  });

  it('should throw is there are too many arguments', () => {
    const want = UnexpectedArgumentError(['extra', 'args']);

    assert.throws(() => parse(['kind', 'client', 'carrier', 'extra', 'args']), want);
  });
});
