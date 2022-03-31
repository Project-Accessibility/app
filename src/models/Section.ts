import { Geofence } from './Geofence';
export class Section {
  id: number;
  title: string;
  geofence?: Geofence;
  description?: string;
  locationDescription?: string;
  teachableMachineClass?: string;

  constructor(
    id: number,
    title: string,
    geofence?: Geofence,
    description?: string,
    locationDescription?: string,
    teachableMachineClass?: string
  ) {
    this.id = id;
    this.title = title;
    this.geofence = geofence;
    this.description = description;
    this.locationDescription = locationDescription;
    this.teachableMachineClass = teachableMachineClass;
  }
}
