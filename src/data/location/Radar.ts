import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Radar from 'react-native-radar';

class RadarLocation {
  private callback: Function | undefined;

  start(uniqueUserId: string) {
    this.configureRadar(uniqueUserId);
    this.handleLocationPermission().then(async (granted) => {
      if (granted) {
        console.log('Location is granted!');
        await this.runRadarTracking();
      } else {
        console.log('Location is not granted!');
      }
    });
  }

  /**
   * Set callback
   *
   * @param callback
   */
  on(callback: Function): void {
    this.callback = callback;
  }

  /**
   * Configure Radar
   *
   * @param uniqueUserId
   * @private
   */
  private configureRadar(uniqueUserId: string) {
    Radar.setUserId(uniqueUserId);
    Radar.on('events', (result: any) => {
      radarLocation.trigger(true, result);
    });
  }

  /**
   * Ask for location permissions
   *
   * @private
   */
  private async handleLocationPermission() {
    if (Platform.OS === 'ios') {
      const permissionCheck = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

      if (permissionCheck !== RESULTS.GRANTED) {
        const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if (permissionRequest !== RESULTS.GRANTED) {
          return false;
        }
      }
    }

    if (Platform.OS === 'android') {
      const permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck !== RESULTS.GRANTED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionRequest !== RESULTS.GRANTED) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Run radar tracking
   *
   * @private
   */
  private async runRadarTracking() {
    const result = await Radar.searchGeofences({
      radius: 20,
    });
    if (this.callback) {
      this.callback(this.getResult(false, result));
    }
    console.log('Location is granted!');
    await Radar.startTrackingContinuous();
  }

  /**
   * Trigger callback if event is registered
   *
   * @param isEvent
   * @param result
   * @private
   */
  private trigger(isEvent: boolean, result: any) {
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
  private getResult(isEvent: boolean, data: any) {
    const result = {
      user: {
        stopped: isEvent ? data.user.stopped : data.location.speed === 0,
        location: {
          longitude: isEvent ? data.user.location.coordinates[0] : data.location.longitude,
          latitude: isEvent ? data.user.location.coordinates[1] : data.location.latitude,
        },
      },
      events: [],
    };
    if (isEvent) {
      data.events.forEach((event: any) => {
        // @ts-ignore
        result.events.push(this.getEvent(isEvent, event));
      });
    } else {
      data.geofences.forEach((geofence: any) => {
        // @ts-ignore
        result.events.push(this.getEvent(isEvent, geofence));
      });
    }
    return result;
  }

  /**
   * Get filtered event
   *
   * @param isEvent
   * @param data
   * @private
   */
  private getEvent(isEvent: boolean, data: any): object {
    return {
      geofence: {
        sectionId: isEvent ? data.geofence.externalId : data.externalId,
        sectionTitle: isEvent ? data.geofence.tag : data.tag,
        sectionDescription: isEvent ? data.geofence.description : data.description,
      },
      type: isEvent ? data.type.replace('user.', '').replace('_geofence', '') : 'entered',
    };
  }
}

const radarLocation: RadarLocation = new RadarLocation();
export default radarLocation;
