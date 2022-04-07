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
    extraData: ['Te fel licht', 'Precies goed', 'Te weinig licht'] as any,
  };
}

export { getQuestionnaireMock, getQuestionOptionMock };
