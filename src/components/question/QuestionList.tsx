import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Question } from '../../models/Question';
import Button from '../generic/Button';

const QuestionList = (props: { questions: Question[] }) => {
  const questions: Question[] = props.questions;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  return (
    <>
      {questions?.map((question, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              finished={isFocused && isAnswered(question)}
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

function isAnswered(question: Question): boolean {
  let finished = false;
  if (!question.questionOptions) return finished;

  question.questionOptions.forEach((questionOption) => {
    if (!questionOption.answers) return finished;

    questionOption.answers.forEach((answer) => {
      if (answer.answer && answer.answer !== "") {
        finished = true;
      }
    });
  });
  return finished;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
});

export default QuestionList;
