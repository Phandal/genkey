#! /usr/bin/env node

import arg from './arg.js';
import type { Arg } from './arg.js';

function usage(err?: unknown): void {
  if (err) {
    console.error(`Error: ${err instanceof Error ? err.message : 'unknown error'}`);
  };

  console.error('Usage:');
  console.error('  cpbc-genkey <TYPE> <CLIENT> <PROVIDER>');
  console.error('\nOPTIONS')
  console.error('  TYPE                  pgp or ssh');
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

  console.error('Arg:', args);
}

main()
  .catch((err) => {
    console.error('Unknown error:', err);
  })
  .then(() => {
    console.error('Success');
  })
