import { Platform } from 'react-native';
import { check, checkMultiple, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Radar from 'react-native-radar';

class RadarLocation {
  private callback: Function | undefined;

  start(uniqueUserId: string) {
    this.configureRadar(uniqueUserId);
    this.handleLocationPermission().then(() => {
      this.runRadarTracking();
    });
  }

  /**
   * Configure Radar
   *
   * @param uniqueUserId
   * @private
   */
  private configureRadar(uniqueUserId: string) {
    Radar.setUserId(uniqueUserId);
    // Radar.on('clientLocation', (result: any) => {
    //   console.log('clientLocation:' + JSON.stringify(result));
    // });
    // Radar.on('location', (result: any) => {
    //   console.log('location:' + JSON.stringify(result));
    // });
    Radar.on('events', (result: any) => {
      radarLocation.trigger(true, result);
    });
    // Radar.on('error', (err: Error) => {
    //   console.log(err.message);
    // });
  }

  /**
   * Ask for location permissions
   *
   * @private
   */
  private async handleLocationPermission() {
    if (Platform.OS === 'ios') {
      const permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }

    if (Platform.OS === 'android') {
      const statuses = await checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);

      if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        permissionRequest === RESULTS.GRANTED
          ? console.warn('FINE_LOCATION permission granted.')
          : console.warn('FINE_LOCATION perrmission denied.');
      }
      if (statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        permissionRequest === RESULTS.GRANTED
          ? console.warn('BACKGROUND_LOCATION permission granted.')
          : console.warn('BACKGROUND_LOCATION perrmission denied.');
      }
      if (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        permissionRequest === RESULTS.GRANTED
          ? console.warn('COARSE_LOCATION permission granted.')
          : console.warn('COARSE_LOCATION perrmission denied.');
      }
    }
  }

  /**
   * Run radar tracking
   *
   * @private
   */
  private runRadarTracking() {
    Radar.getPermissionsStatus().then(async (status: string) => {
      if (status !== 'GRANTED_BACKGROUND') {
        console.log('Location is not granted!');
      } else {
        const result = await Radar.searchGeofences({
          radius: 20,
        });
        if (this.callback) {
          this.callback(this.getResult(false, result));
        }
        console.log('Location is granted!');
        await Radar.startTrackingContinuous();
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
