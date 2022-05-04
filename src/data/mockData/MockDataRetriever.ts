import { QuestionOptionType } from '../../enums/QuestionOptionType';
import { Questionnaire } from '../../models/Questionnaire';
import { QuestionOption } from '../../models/QuestionOption';
import QuestionnaireMock from './questionnaire/mockObject.json';

function getQuestionnaireMock(): Questionnaire {
  return <Questionnaire>(<unknown>QuestionnaireMock);
}

function getQuestionOptionMock(): QuestionOption {
  return {
    id: 1,
    type: QuestionOptionType.MULTIPLE_CHOICE,
    extraData: {
      min: 1,
      max: 5,
      step: 1,
    } as object,
  };
}

export { getQuestionnaireMock, getQuestionOptionMock };
