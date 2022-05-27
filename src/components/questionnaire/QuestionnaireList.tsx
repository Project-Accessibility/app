import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import { QuestionnaireDisplay } from '../../data/localStorage/ParticipantCode';
import { Questionnaire } from '../../models/Questionnaire';
import Button from '../generic/Button';
import { handleQuestionnaire } from './HandleQuestionnaire';

interface QuestionnaireListProps {
  questionnaires: QuestionnaireDisplay[];
}

const QuestionnaireList = ({ questionnaires }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  const handleQuestionnaireSelected = async (code: string) => {
    handleQuestionnaire(code, navigation);
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
