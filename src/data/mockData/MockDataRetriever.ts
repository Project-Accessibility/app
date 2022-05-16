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
      values: ['Te fel licht', 'Precies goed', 'Te weinig licht'],
      multiple: 0,
    } as object,
  };
}

export { getQuestionnaireMock, getQuestionOptionMock };
