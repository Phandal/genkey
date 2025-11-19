#! /usr/bind/env node

import fs from 'node:fs/promises';
import * as arg from './arg.js';
import { registerKeyProvider, createKeyProvider, KeyProvider } from './providers/registry.js';
import { pgpKeyProvider } from './providers/pgp.js';
import type { Arg } from './arg.js';
import { sshInboundKeyProvider, sshOutboundKeyProvider } from './providers/ssh.js';

registerKeyProvider({ kind: 'pgp', provider: pgpKeyProvider });
registerKeyProvider({ kind: 'ssh-inbound', provider: sshInboundKeyProvider });
registerKeyProvider({ kind: 'ssh-outbound', provider: sshOutboundKeyProvider });

function usage(err?: unknown): void {
  if (err) {
    console.error(`Error: ${err instanceof Error ? err.message : 'unknown error'}`);
  };

  console.error('Usage:');
  console.error('  cpbc-genkey <TYPE> <CLIENT> <PROVIDER>');
  console.error('\nOPTIONS')
  console.error('  TYPE                  pgp | ssh-inbound | ssh-outbound');
  console.error('  CLIENT                name of the client');
  console.error('  PROVIDER              name of the provider');
  process.exit(1);
}

async function main() {
  let args: Arg;
  try {
    args = arg.parse(process.argv.slice(2));
  } catch (err) {
    usage(err);
    return;
  }

  let keyProvider: KeyProvider;
  try {
    keyProvider = createKeyProvider({ kind: args.kind });
  } catch (err) {
    usage(err);
    return;
  }

  console.error('Creating key pair...');
  const key = await keyProvider({ client: args.client, carrier: args.carrier });
  console.error(`Created key pair ${key.name}`);

  console.error('Writing key files...');
  const publicName = `${key.name}.pub.txt`;
  const privateName = `${key.name}.priv.txt`;
  await fs.writeFile(publicName, key.public);
  await fs.writeFile(privateName, key.private);
  console.error(`Wrote keys '${publicName}' and '${privateName}'`);
}

main()
  .catch((err) => {
    console.error('Unknown error:', err);
  })
  .then(() => {
    console.error('Success');
  })
