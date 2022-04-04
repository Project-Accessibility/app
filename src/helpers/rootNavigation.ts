import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: Object = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}
