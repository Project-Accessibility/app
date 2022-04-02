import { Questionnaire } from '../../models/Questionnaire';
import QuestionnaireMock from './questionnaire/mockObject.json';

function getQuestionnaireMock(): Questionnaire {
  return <Questionnaire>(<unknown>QuestionnaireMock);
}

export { getQuestionnaireMock };
