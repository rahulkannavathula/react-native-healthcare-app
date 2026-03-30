import { useEffect, useState } from 'react';
import { getRemoteConfigValues, initRemoteConfig } from '../services/firebaseConfig';
import { RemoteConfigValues } from '../types/patient';

export function useFirebaseConfig() {
  const [config, setConfig] = useState<RemoteConfigValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      await initRemoteConfig();
      setConfig(getRemoteConfigValues());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return { config, loading, error, refresh: load };
}
