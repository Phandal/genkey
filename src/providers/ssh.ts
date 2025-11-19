import { KeyPair, KeyProvider, KeyProviderOptions } from './registry'
import ssh2 from 'ssh2';

export const sshInboundKeyProvider: KeyProvider = async (o: KeyProviderOptions): Promise<KeyPair> => {
  const comment = `CreativePlanning_${o.client}_${o.carrier}`;
  const keys = ssh2.utils.generateKeyPairSync('rsa', { bits: 4096, comment });

  return {
    public: keys.public,
    private: keys.private,
    name: comment,
  };
}

export const sshOutboundKeyProvider: KeyProvider = async (o: KeyProviderOptions): Promise<KeyPair> => {
  const comment = `${o.client}_${o.carrier}`;
  const keys = ssh2.utils.generateKeyPairSync('rsa', { bits: 4096, comment });

  return {
    public: keys.public,
    private: keys.private,
    name: comment,
  };
}
