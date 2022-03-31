import { Section } from './Section';

export class Questionnaire {
  id: number;
  title: string;
  open: boolean;
  description?: string;
  instructions?: string;
  teachableMachineLink?: string;
  sections?: [Section];

  constructor(
    id: number,
    title: string,
    open: boolean,
    description?: string,
    instructions?: string,
    teachableMachineLink?: string,
    sections?: [Section]
  ) {
    this.id = id;
    this.title = title;
    this.open = open;
    this.description = description;
    this.instructions = instructions;
    this.teachableMachineLink = teachableMachineLink;
    this.sections = sections;
  }
}
