export type Arg = {
  kind: 'pgp' | 'ssh',
  client: string;
  provider: string;
};

export const MissingArgumentError = new Error('missing arguments');

export function UnexpectedArgumentError(args: string[]): Error {
  return new Error(`unexpected arguments: '${args.join(', ')}'`);
}

export function InvalidKeyKindError(kind: string): Error {
  return new Error(`unknown key kind: '${kind}'`);
}

export function parse(args: string[]): Arg {
  if (args.length < 3) {
    throw MissingArgumentError;
  }
  if (args.length > 3) {
    throw UnexpectedArgumentError(args.slice(3));
  }

  const [kind, client, provider] = args;

  switch (kind) {
    case 'pgp':
      return {
        kind,
        client,
        provider
      }
    case 'ssh':
      return {
        kind,
        client,
        provider,
      }
    default:
      throw InvalidKeyKindError(kind);
  }
}

export default {
  parse,
}
