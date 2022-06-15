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
  } else {
    let result = false;
    if (response && response.error) {
      if (response.status === 404 || response.status == 422) {
        await ParticipantCode.removeQuestionaireFromLocalStorage(code).then((res) => {
          result = res;
        });
      }
    }
    triggerSnackbarShort(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, Colors.red);
    isFetching = false;
    return result;
  }
}
