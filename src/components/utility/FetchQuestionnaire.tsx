import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { showToast } from '../../helpers/popupHelper';

let isFetching = false;

export async function fetchQuestionnaire(code: string, navigation: any) {
  if (isFetching) {
    showToast(ACCESSIBILITY_STRINGS.isFetchingQuestionnaire);
    return;
  }
  isFetching = true;

  let questionnaire = await getAllQuestionnaireDataByCode(code);

  if (questionnaire) {
    await Promise.all([
      ParticipantCode.saveCurrentParticipantCodeToLocalStorage(code),
      ParticipantCode.addQuestionnaireInLocalStorage({
        code: code,
        name: questionnaire.title,
      }),
    ]);
    // @ts-ignore next-line
    navigation.navigate('Questionnaire', {
      title: questionnaire.title,
      questionnaire: questionnaire,
    });
  } else {
    showToast(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire);
  }

  isFetching = false;
}
