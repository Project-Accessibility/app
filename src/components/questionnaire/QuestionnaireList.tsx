import React from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../assets/colors';
import { Questionnaire } from '../../models/Questionnaire';
import { Section } from '../../models/Section';
import Button from '../generic/Button';

const QuestionnaireList = (props: { questionnaire: Questionnaire }) => {
  const questionnaire: Questionnaire = props.questionnaire;
  return (
    <>
      {questionnaire?.sections?.map((section, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              title={section.title}
              onButtonPress={() => console.log(`Clicked, ${section.title}`)}
              maxAnswers={getTotalQuestions(section)}
              answered={getAnsweredQuestions(section)}
            />
          </View>
        );
      })}
    </>
  );
};

function getAnsweredQuestions(section: Section): number {
  let answeredQuestions = 0;
  section.questions?.forEach((question) => {
    question.questionOptions?.forEach((questionOption) => {
      questionOption.answers?.forEach((answer) => {
        answer.answer ? answeredQuestions++ : null;
      });
    });
  });
  return answeredQuestions;
}

function getTotalQuestions(section: Section): number {
  let totalQuestions = 0;
  section.questions?.forEach((question) => {
    totalQuestions += question.questionOptions?.length ?? 0;
  });
  return totalQuestions;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
});

export default QuestionnaireList;
