declare module 'react-native-radar' {
  export type permissionStatus =
    | 'GRANTED_BACKGROUND'
    | 'GRANTED_FOREGROUND'
    | 'NOT_DETERMINED'
    | 'DENIED';
  export type errorString =
    | 'ERROR_PUBLISHABLE_KEY'
    | 'ERROR_PERMISSIONS'
    | 'ERROR_LOCATION'
    | 'ERROR_NETWORK'
    | 'ERROR_BAD_REQUEST'
    | 'ERROR_UNAUTHORIZED'
    | 'ERROR_PAYMENT_REQUIRED'
    | 'ERROR_FORBIDDEN'
    | 'ERROR_NOT_FOUND'
    | 'ERROR_RATE_LIMIT'
    | 'ERROR_SERVER'
    | 'ERROR_UNKNOWN';

  export interface trackResult {
    location: RadarLocation;
    events: any;
    user?: {
      geofences: any;
    };
  }

  export type onClientLocations = (
    event: 'clientLocation',
    callback: (result: any) => void
  ) => void;

  export type onEvents = (
    event: 'events',
    callback: (result: { events: any; user: any }) => void
  ) => void;

  export type onLocation = (
    event: 'location',
    callback: (result: { location: RadarLocation; user: any }) => void
  ) => void;

  export type onError = (event: 'error', callback: (err: any) => void) => void;

  export type onEvent = onClientLocations | onEvents | onLocation | onError;

  export interface RadarLocation {
    latitude: number;
    longitude: number;
    accuracy: number;
  }

  export interface Radar {
    initialize: (publishableKey: string) => void;
    setUserId: (userId: string) => void;
    setMetadata: (metadata: object) => void;
    setDescription: (setDescription: string) => void;
    setPlacesProvider: (provider: string) => void;
    getPermissionsStatus: () => Promise<permissionStatus>;
    // possible return permissionStatus but idk
    requestPermissions: (background: boolean) => any;
    trackOnce: () => Promise<trackResult>;
    startTracking: (options: object) => any;
    startTrackingEfficient: () => any;
    startTrackingContinuous: () => any;
    startTrackingResponsive: () => any;
    stopTracking: () => void;
    getLocation: () => any;
    searchGeofences: (options: object) => any;
    on: (event: 'events', callback: (result: { events: any; user: any }) => void) => void;
    off: (event: 'events' | 'location' | 'error') => void;
    updateLocation: (location: RadarLocation) => trackResult;
  }

  const Radar: Radar;
  export default Radar;
}

declare module 'rn-range-slider' {
  import React from 'react';
  import { ViewStyle } from 'react-native';

  interface RangeSliderProps {
    min: number;
    max: number;
    step: number;
    low?: number;
    high?: number;
    floatingLabel?: boolean;
    disableRange?: boolean;
    disabled?: boolean;
    allowLabelOverflow?: boolean;
    renderThumb: () => JSX.Element;
    renderRail: () => JSX.Element;
    renderRailSelected: () => JSX.Element;
    renderLabel?: (value: number) => JSX.Element;
    renderNotch?: () => JSX.Element;
    onValueChanged?: (low: number, high: number, fromUser: boolean) => void;
    style?: ViewStyle;
  }

  export default class RangeSlider extends React.Component<RangeSliderProps> {}
}
