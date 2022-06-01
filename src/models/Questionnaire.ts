import { Section } from './Section';

export class Questionnaire {
  id: number;
  title: string;
  open: boolean;
  participantCode: string;
  description?: string;
  instructions?: string;
  teachableMachineLink?: string;
  sections?: Section[];

  constructor(
    id: number,
    title: string,
    open: boolean,
    participantCode: string,
    description?: string,
    instructions?: string,
    teachableMachineLink?: string,
    sections?: Section[]
  ) {
    this.id = id;
    this.title = title;
    this.open = open;
    this.participantCode = participantCode;
    this.description = description;
    this.instructions = instructions;
    this.teachableMachineLink = teachableMachineLink;
    this.sections = sections;
  }
}
