export class Geofence {
  id: number;
  longitude: number;
  latitude: number;
  radius: number;

  constructor(id: number, longitude: number, latitude: number, radius: number) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.radius = radius;
  }
}
