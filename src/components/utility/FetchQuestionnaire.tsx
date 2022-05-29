import { Alert, Platform, ToastAndroid } from 'react-native';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
let isFetching = false;

export async function fetchQuestionnaire(code: string, navigation: any) {
  if (!isFetching) {
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