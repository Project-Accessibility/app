import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import { questionnaire } from '../../data/localStorage/ParticipantCode';
import { Questionnaire } from '../../models/Questionnaire';
import Button from '../generic/Button';

interface QuestionnaireListProps {
  questionnaires: questionnaire[];
}

const QuestionnaireList = ({ questionnaires }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  const handleCodeEntered = async (code: string) => {
    let questionnaireResponse = await getAllQuestionnaireDataByCode(code);
    if (questionnaireResponse.status === 200) {
      const questionnaireData: Questionnaire = questionnaireResponse.data;
      // @ts-ignore next-line
      navigation.navigate('Questionnaire', {
        title: questionnaireData.title,
        questionnaire: questionnaireData,
      });
    } else {
      const msg = 'Vragenlijst niet gelukt op te halen';
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG);
      } else {
        Alert.alert(msg);
      }
    }
  };
  return (
    <>
      {questionnaires?.map((questionnaireItem, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              title={questionnaireItem.name}
              onButtonPress={() => handleCodeEntered(questionnaireItem.code)}
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
