import remoteConfig from '@react-native-firebase/remote-config';
import { RemoteConfigValues } from '../types/patient';

const DEFAULTS: Omit<RemoteConfigValues, 'featureFlags'> & { featureFlags: string } = {
  showTelehealthBanner: false,
  maxAppointmentsPerDay: 20,
  enablePushNotifications: true,
  maintenanceMode: false,
  featureFlags: '{}',
};

export async function initRemoteConfig(): Promise<void> {
  await remoteConfig().setDefaults(DEFAULTS as unknown as Record<string, string | number | boolean>);
  await remoteConfig().setConfigSettings({ minimumFetchIntervalMillis: __DEV__ ? 0 : 3_600_000 });
  await remoteConfig().fetchAndActivate();
}

export function getRemoteConfigValues(): RemoteConfigValues {
  const rc = remoteConfig();
  return {
    showTelehealthBanner: rc.getValue('showTelehealthBanner').asBoolean(),
    maxAppointmentsPerDay: rc.getValue('maxAppointmentsPerDay').asNumber(),
    enablePushNotifications: rc.getValue('enablePushNotifications').asBoolean(),
    maintenanceMode: rc.getValue('maintenanceMode').asBoolean(),
    featureFlags: JSON.parse(rc.getValue('featureFlags').asString() || '{}') as Record<string, boolean>,
  };
}
