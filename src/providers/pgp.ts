import { KeyPair, KeyProvider, KeyProviderOptions } from "./registry";
import * as pgp from 'openpgp';

export const pgpKeyProvider: KeyProvider = async (o: KeyProviderOptions): Promise<KeyPair> => {
  const comment = `${o.client}_${o.carrier}`;

  const keys = await pgp.generateKey({
    format: 'armored',
    type: 'rsa',
    userIDs: { name: 'Creative Planning', email: 'edi@creativeplanning.com', comment: `Creative Planning | ${o.carrier}` },
    rsaBits: 4096,
    config: {
      commentString: comment,
    }
  });

  return {
    public: keys.publicKey,
    private: keys.privateKey,
    name: comment,
  }
}
