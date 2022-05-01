import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Question } from '../../models/Question';
import Button from '../generic/Button';

const QuestionList = (props: { questions: Question[] }) => {
  const questions: Question[] = props.questions;
  const navigation = useNavigation();
  return (
    <>
      {questions?.map((question, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              finished={getAnsweredQuestion(question)}
              title={question.title}
              onButtonPress={() => {
                // @ts-ignore next-line
                navigation.navigate('Question', {
                  title: question.title,
                  question: question,
                });
              }}
            />
          </View>
        );
      })}
    </>
  );
};

function getAnsweredQuestion(question: Question): boolean {
  let answeredQuestions = 0;
  question.questionOptions?.forEach((questionOption) => {
    questionOption.answers?.forEach((answer) => {
      answer.answer ? answeredQuestions++ : null;
    });
  });

  let totalQuestions = question.questionOptions?.length as number;

  return totalQuestions <= answeredQuestions;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
});

export default QuestionList;
