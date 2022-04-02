import { Questionnaire } from '../../models/Questionnaire';
import QuestionnareMock from './questionnaire/mockObject.json';

function getQuestionnaireMock(): Questionnaire {
  return <Questionnaire>(<unknown>QuestionnareMock);
}

export { getQuestionnaireMock };
