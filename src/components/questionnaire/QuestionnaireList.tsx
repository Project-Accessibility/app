import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionnaireDisplay } from '../../data/localStorage/ParticipantCode';
import Button from '../generic/Button';
import { fetchQuestionnaire } from '../utility/FetchQuestionnaire';

interface QuestionnaireListProps {
  questionnaires: QuestionnaireDisplay[];
}

const QuestionnaireList = ({ questionnaires }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  const handleQuestionnaireSelected = async (code: string) => {
    fetchQuestionnaire(code, navigation);
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
