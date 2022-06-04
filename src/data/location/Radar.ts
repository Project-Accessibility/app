import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Radar from 'react-native-radar';
import ParticipantCode from '../localStorage/ParticipantCode';

interface PermissionResult {
  success: boolean;
  isRequested: boolean;
}

export class Result {
  user: User;
  events: Event[];

  constructor(user: User, events: Event[]) {
    this.user = user;
    this.events = events;
  }

  addEvent(event: Event) {
    this.events.push(event);
  }
}

export class User {
  stopped: boolean;
  location: Location;

  constructor(stopped: boolean, location: Location) {
    this.stopped = stopped;
    this.location = location;
  }
}

export class Location {
  longitude: number;
  latitude: number;

  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}

export class Event {
  geofence: Geofence;
  type: string;

  constructor(geofence: Geofence, type: string) {
    this.geofence = geofence;
    this.type = type;
  }
}

export class Geofence {
  sectionId: number;
  sectionTitle: string;
  sectionDescription: string;

  constructor(sectionId: number, sectionTitle: string, sectionDescription: string) {
    this.sectionId = sectionId;
    this.sectionTitle = sectionTitle;
    this.sectionDescription = sectionDescription;
  }
}

class RadarLocation {
  private callback: Function | undefined;
  private backupUserId: string = 'cd66931c-a623-11ec-b909-0242ac120002';

  public async init() {
    const participantCode = await ParticipantCode.loadCurrentParticipantCodeFromLocalStorage();
    const userId: string = participantCode ?? this.backupUserId;
    this.configureRadar(userId);
  }

  public async start() {
    const result = await this.handleLocationPermission();
    if (result.success) {
      if (result.isRequested) {
        console.log('Location is granted!');
        await this.runRadarOnce();
      }
      await this.runRadarTracking();
    } else {
      console.log('Location is not granted!');
    }
  }

  /**
   * Set callback
   *
   * @param callback
   */
  public on(callback: Function): void {
    this.callback = callback;
  }

  public stopTracking() {
    Radar.stopTracking();
  }

  /**
   * Ask for location permissions
   *
   * @protected
   */
  protected async handleLocationPermission(): Promise<PermissionResult> {
    let isRequested = false;
    if (Platform.OS === 'ios') {
      const permissionCheck = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

      if (permissionCheck !== RESULTS.GRANTED) {
        isRequested = true;
        const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if (permissionRequest !== RESULTS.GRANTED) {
          return {
            success: false,
            isRequested,
          };
        }
      }
    }

    if (Platform.OS === 'android') {
      const permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck !== RESULTS.GRANTED) {
        isRequested = true;
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionRequest !== RESULTS.GRANTED) {
          return {
            success: false,
            isRequested,
          };
        }
      }
    }
    return {
      success: true,
      isRequested,
    };
  }

  /**
   * Configure Radar
   *
   * @param userId
   * @private
   */
  private configureRadar(userId: string) {
    Radar.setUserId(userId);
    Radar.on('events', (result: any) => {
      radarLocation.trigger(true, result);
    });
  }

  /**
   * Get Radar data once
   *
   */
  public async runRadarOnce() {
    const result = await Radar.searchGeofences({
      radius: 20,
    });
    if (this.callback) {
      this.callback(this.getResult(false, result));
    }
  }

  /**
   * Run radar tracking
   *
   * @private
   */
  protected async runRadarTracking() {
    await Radar.startTrackingContinuous();
  }

  /**
   * Trigger callback if event is registered
   *
   * @param isEvent
   * @param result
   * @private
   */
  private trigger(isEvent: boolean, result: any): void {
    if (this.callback) {
      this.callback(this.getResult(isEvent, result));
    }
  }

  /**
   * Get filtered result
   *
   * @param isEvent
   * @param data
   * @private
   */
  private getResult(isEvent: boolean, data: any): Result {
    const result = new Result(
      new User(
        isEvent ? data.user.stopped : data.location.speed === 0,
        new Location(
          isEvent ? data.user.location.coordinates[0] : data.location.longitude,
          isEvent ? data.user.location.coordinates[1] : data.location.latitude
        )
      ),
      []
    );
    if (isEvent) {
      data.events.forEach((event: any) => {
        result.addEvent(this.getEvent(isEvent, event));
      });
    } else {
      data.geofences.forEach((geofence: any) => {
        result.addEvent(this.getEvent(isEvent, geofence));
      });
    }
    return result;
  }

  /**
   * Get filtered event
   *
   * @param isEvent
   * @param data
   * @protected
   */
  protected getEvent(isEvent: boolean, data: any): Event {
    const geofence = new Geofence(
      isEvent ? Number(data.geofence.externalId) : Number(data.externalId),
      isEvent ? data.geofence.tag : data.tag,
      isEvent ? data.geofence.description : data.description
    );
    return new Event(
      geofence,
      isEvent ? data.type.replace('user.', '').replace('_geofence', '') : 'entered'
    );
  }
}

const radarLocation: RadarLocation = new RadarLocation();
export default radarLocation;
