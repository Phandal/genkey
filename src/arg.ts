export type Arg = {
  kind: string;
  client: string;
  carrier: string;
}

export const MissingArgumentError = new Error('missing arguments');

export function UnexpectedArgumentError(args: string[]): Error {
  return new Error(`unexpected arguments: '${args.join(', ')}'`);
}

export function parse(args: string[]): Arg {
  if (args.length < 3) {
    throw MissingArgumentError;
  }
  if (args.length > 3) {
    throw UnexpectedArgumentError(args.slice(3));
  }

  const [kind, client, carrier] = args;
  return {
    kind,
    client,
    carrier,
  }
}
