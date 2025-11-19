import { describe, it } from 'node:test';
import assert from 'node:assert'

import { sshInboundKeyProvider, sshOutboundKeyProvider } from '../src/providers/ssh';

describe('sshInboundKeyProvider', () => {
  it('creates ssh keys for inbound use', async () => {
    const got = await sshInboundKeyProvider({ client: 'client', carrier: 'carrier' });

    assert(got.public.startsWith('ssh-rsa'));
    assert(got.private.startsWith('-----BEGIN OPENSSH PRIVATE KEY-----'));
    assert.deepEqual(got.name, 'CreativePlanning_client_carrier');
  });
});

describe('sshOutboundKeyProvider', () => {
  it('creates ssh keys for outbound use', async () => {
    const got = await sshOutboundKeyProvider({ client: 'client', carrier: 'carrier' });

    assert(got.public.startsWith('ssh-rsa'));
    assert(got.private.startsWith('-----BEGIN OPENSSH PRIVATE KEY-----'));
    assert.deepEqual(got.name, 'client_carrier');
  });
});
