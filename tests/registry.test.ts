import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';

import * as registry from '../src/providers/registry'

const mockProvider: registry.KeyProvider = async (): Promise<registry.KeyPair> => {
  return {
    public: 'pub',
    private: 'priv',
    name: 'name',
  }
}

beforeEach(() => {
  registry.__reset();
});

describe('keyProvider registry module', () => {
  it('should register keyProviders', async () => {
    registry.registerKeyProvider({ kind: 'mock', provider: mockProvider });

    const provider = registry.createKeyProvider({ kind: 'mock' });
    assert.deepEqual(provider, mockProvider);

    const got = await provider({ client: '', carrier: '' });
    const want = { public: 'pub', private: 'priv', name: 'name' };

    assert.deepEqual(got, want);
  });

  it('should throw if unknown keyProvider is requeted', () => {
    const want = registry.UnknownKeyProvider('mock');
    assert.throws(() => registry.createKeyProvider({ kind: 'mock' }), want);
  });
});
