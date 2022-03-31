import { Geofence } from './Geofence';
import { Questionnaire } from './Questionnaire';

export class Section {
  id: number;
  questionnaire: Questionnaire;
  title: string;
  geofence?: Geofence;
  description?: string;
  locationDescription?: string;
  teachableMachineClass?: string;

  constructor(
    id: number,
    questionnaire: Questionnaire,
    title: string,
    geofence?: Geofence,
    description?: string,
    locationDescription?: string,
    teachableMachineClass?: string
  ) {
    this.id = id;
    this.questionnaire = questionnaire;
    this.title = title;
    this.geofence = geofence;
    this.description = description;
    this.locationDescription = locationDescription;
    this.teachableMachineClass = teachableMachineClass;
  }
}
