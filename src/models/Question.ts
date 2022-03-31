import { Section } from './Section';

export class Question {
  id: number;
  section: Section;
  title: string;
  question: string;

  constructor(id: number, section: Section, title: string, question: string) {
    this.id = id;
    this.section = section;
    this.title = title;
    this.question = question;
  }
}
