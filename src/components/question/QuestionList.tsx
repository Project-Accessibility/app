import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Question } from '../../models/Question';
import Button from '../generic/Button';

const QuestionList = (props: { questions: Question[] }) => {
  const questions: Question[] = props.questions;
  return (
    <>
      {questions?.map((question, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              finished={getAnsweredQuestion(question)}
              title={question.title}
              onButtonPress={() => console.log(`Clicked, ${question.title}`)}
            />
          </View>
        );
      })}
    </>
  );
};

function getAnsweredQuestion(question: Question): boolean {
  let answeredQuestion = false;
  question.questionOptions?.forEach((questionOption) => {
    questionOption.answers?.forEach((answer) => {
      answer.answer ? (answeredQuestion = true) : (answeredQuestion = false);
    });
  });
  return answeredQuestion;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
});

export default QuestionList;
