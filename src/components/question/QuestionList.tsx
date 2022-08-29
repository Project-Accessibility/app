import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Question } from '../../models/Question';
import Button from '../generic/Button';
import FONTS from '../../assets/fonts';
import COLORS from '../../assets/colors';
import accessibilityStrings from '../../assets/accessibilityStrings';
import { Section } from '../../models/Section';

const QuestionList = (props: { questions: Question[]; section: Section }) => {
  const section: Section = props.section;
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
              accHint={Question.isAnswered(question) ? 'beantwoord' : ''}
              finished={isFocused && Question.isAnswered(question)}
              title={question.title}
              onButtonPress={() => {
                // @ts-ignore next-line
                navigation.navigate('Question', {
                  title: question.title,
                  question: question,
                  section: section,
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
    marginTop: 5,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default QuestionList;
