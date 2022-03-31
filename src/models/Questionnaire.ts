import { Research } from './Research';

export class Questionnaire {
  id: number;
  research: Research;
  title: string;
  open: boolean;
  description?: string;
  instructions?: string;
  teachableMachineLink?: string;

  constructor(
    id: number,
    research: Research,
    title: string,
    open: boolean,
    description?: string,
    instructions?: string,
    teachableMachineLink?: string
  ) {
    this.id = id;
    this.research = research;
    this.title = title;
    this.open = open;
    this.description = description;
    this.instructions = instructions;
    this.teachableMachineLink = teachableMachineLink;
  }
}
