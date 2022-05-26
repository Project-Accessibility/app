import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import { questionnaire } from '../../data/localStorage/ParticipantCode';
import { Questionnaire } from '../../models/Questionnaire';
import Button from '../generic/Button';

interface QuestionnaireListProps {
  questionnaires: questionnaire[];
}

const QuestionnaireList = ({ questionnaires }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  const handleQuestionnaireSelected = async (code: string) => {
    try {
      let questionnaireResponse = await getAllQuestionnaireDataByCode(code);
      if (questionnaireResponse.status === 200) {
        const questionnaireData: Questionnaire = questionnaireResponse.data;
        // @ts-ignore next-line
        navigation.navigate('Questionnaire', {
          title: questionnaireData.title,
          questionnaire: questionnaireData,
        });
      }
    } catch (e) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, ToastAndroid.LONG);
      } else {
        Alert.alert(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire);
      }
    }
  };
  return (
    <>
      {questionnaires?.map((questionnaireItem, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              accLabel={questionnaireItem.name}
              title={questionnaireItem.name}
              onButtonPress={() => handleQuestionnaireSelected(questionnaireItem.code)}
            />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginBottom: 10,
  },
});

export default QuestionnaireList;
