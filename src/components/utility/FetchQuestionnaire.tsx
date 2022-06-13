import { Alert, Platform, ToastAndroid } from 'react-native';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';

let isFetching = false;

export async function fetchQuestionnaire(code: string, navigation: any) {
  if (!isFetching) {
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
      return true;
    } else if (response && response.error) {
      // probably an error
      if (response.status === 404) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            ACCESSIBILITY_STRINGS.failedToFetchDeletedQuestionaire,
            ToastAndroid.LONG
          );
        } else {
          Alert.alert(ACCESSIBILITY_STRINGS.failedToFetchDeletedQuestionaire);
        }
        let result = false;
        await ParticipantCode.removeQuestionaireFromLocalStorage(code).then((res) => {
          result = res;
        });
        isFetching = false;
        return result;
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, ToastAndroid.LONG);
      } else {
        Alert.alert(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire);
      }
    }

    isFetching = false;
  } else {
    if (Platform.OS === 'android') {
      ToastAndroid.show(ACCESSIBILITY_STRINGS.isFetchingQuestionnaire, ToastAndroid.LONG);
    } else {
      Alert.alert(ACCESSIBILITY_STRINGS.isFetchingQuestionnaire);
    }
  }
}
