export class Geofence {
  id: number;
  longtitude: number;
  latitude: number;
  radius: number;

  constructor(id: number, longtitude: number, latitude: number, radius: number) {
    this.id = id;
    this.longtitude = longtitude;
    this.latitude = latitude;
    this.radius = radius;
  }
}
