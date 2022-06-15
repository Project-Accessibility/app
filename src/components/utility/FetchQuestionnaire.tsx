import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { triggerSnackbarShort } from '../../helpers/popupHelper';
import Colors from '../../assets/colors';

let isFetching = false;

export async function fetchQuestionnaire(code: string, navigation: any) {
  if (isFetching) {
    triggerSnackbarShort(ACCESSIBILITY_STRINGS.isFetchingQuestionnaire, Colors.darkBlue);
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
    triggerSnackbarShort(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, Colors.red);
  }

  isFetching = false;
}
