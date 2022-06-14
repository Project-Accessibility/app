import { Geofence } from './Geofence';
import { Question } from './Question';
export class Section {
  id: number;
  title: string;
  geofence?: Geofence;
  description?: string;
  location_description?: string;
  teachableMachineClass?: string;
  questions?: [Question];

  constructor(
    id: number,
    title: string,
    geofence?: Geofence,
    description?: string,
    location_description?: string,
    teachableMachineClass?: string,
    questions?: [Question]
  ) {
    this.id = id;
    this.title = title;
    this.geofence = geofence;
    this.description = description;
    this.location_description = location_description;
    this.teachableMachineClass = teachableMachineClass;
    this.questions = questions;
  }
}
