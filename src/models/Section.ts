import { Geofence } from './Geofence';
import { Question } from './Question';
export class Section {
  id: number;
  title: string;
  geofence?: Geofence;
  description?: string;
  locationDescription?: string;
  teachableMachineClass?: string;
  questions?: [Question];

  constructor(
    id: number,
    title: string,
    geofence?: Geofence,
    description?: string,
    locationDescription?: string,
    teachableMachineClass?: string,
    questions?: [Question]
  ) {
    this.id = id;
    this.title = title;
    this.geofence = geofence;
    this.description = description;
    this.locationDescription = locationDescription;
    this.teachableMachineClass = teachableMachineClass;
    this.questions = questions;
  }
}
