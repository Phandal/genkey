export type KeyPair = {
  public: string;
  private: string;
  name: string;
}

export type KeyProviderOptions = {
  client: string;
  carrier: string;
}

export type KeyProvider = (o: KeyProviderOptions) => Promise<KeyPair>;

const registry = new Map<string, KeyProvider>();

export function UnknownKeyProvider(kind: string): Error {
  return new Error(`unknown key kind '${kind}'`);
}

export function registerKeyProvider(o: { kind: string, provider: KeyProvider }): void {
  registry.set(o.kind, o.provider)
}

export function createKeyProvider(o: { kind: string }): KeyProvider {
  const keyProvider = registry.get(o.kind);

  if (!keyProvider) {
    throw UnknownKeyProvider(o.kind);
  }

  return keyProvider;
}

export function __reset() {
  registry.clear();
}
