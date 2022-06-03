import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Question } from '../../models/Question';
import Button from '../generic/Button';
import { QuestionOption } from '../../models/QuestionOption';
import FONTS from '../../assets/fonts';
import COLORS from '../../assets/colors';
import accessibilityStrings from '../../assets/accessibilityStrings';

const QuestionList = (props: { questions: Question[] }) => {
  const questions: Question[] = props.questions;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  return (
    <>
      {questions?.length === 0 && (
        <Text style={styles.text}>{accessibilityStrings.noQuestions}</Text>
      )}
      {questions?.map((question, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              accLabel={`vragen over ${question.title}`}
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
  if (!question.options) return finished;

  question.options.forEach((option: QuestionOption) => {
    if (!option.answer) return finished;

    const length: number = option.answer.values?.length ?? 0;
    if (length > 0) {
      finished = true;
    }
  });
  return finished;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default QuestionList;
