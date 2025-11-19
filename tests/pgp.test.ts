import { describe, it } from 'node:test';
import assert from 'node:assert';

import { pgpKeyProvider } from '../src/providers/pgp';

describe('pgpKeyProvider', () => {
  it('creates pgp keys', async () => {
    const got = await pgpKeyProvider({ client: 'client', carrier: 'carrier' });

    assert(got.public.startsWith('-----BEGIN PGP PUBLIC KEY BLOCK-----'));
    assert(got.private.startsWith('-----BEGIN PGP PRIVATE KEY BLOCK-----'));
    assert.deepEqual(got.name, `client_carrier`);
  });
});
