import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { triggerSnackbarShort } from '../../helpers/popupHelper';
import Colors from '../../assets/colors';

let isFetching = false;

/*
  * Fetch questionnaire data by code
  * @param code: 5 letter string code of participant
  * @param navigation: Navigation
  * @returns Promise<boolean> - true if questionnaire was deleted
 */
export async function fetchQuestionnaire(code: string, navigation: any) {
  if (isFetching) {
    triggerSnackbarShort(ACCESSIBILITY_STRINGS.isFetchingQuestionnaire, Colors.darkBlue);
    return;
  }

  isFetching = true;

  let response = await getAllQuestionnaireDataByCode(code);

  if (response && !response.error) {
    await Promise.all([
      ParticipantCode.saveCurrentParticipantCodeToLocalStorage(code),
      ParticipantCode.addQuestionnaireInLocalStorage({
        code: code,
        name: response.data.title,
      }),
    ]);
    isFetching = false;
    // @ts-ignore next-line
    navigation.navigate('Questionnaire', {
      title: response.data.title,
      questionnaire: response.data,
    });

    return false;
  } else if (response && response.error) {
    if (response.status === 404) {
      triggerSnackbarShort(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, Colors.red);

      let result = false;
      await ParticipantCode.removeQuestionaireFromLocalStorage(code).then((res) => {
        result = res;
      });
      isFetching = false;
      return result;
    }
  }
}
