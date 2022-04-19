import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Questionnaire } from '../../models/Questionnaire';
import Button from '../generic/Button';

interface QuestionnaireListProps {
  questionnaires: Questionnaire[];
}

const QuestionnaireList = ({ questionnaires }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  return (
    <>
      {questionnaires?.map((questionnaire, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              title={questionnaire.title}
              onButtonPress={() => {
                // @ts-ignore next-line
                navigation.navigate('Questionnaire', {
                  title: questionnaire.title,
                  questionnaire: questionnaire,
                });
              }}
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
