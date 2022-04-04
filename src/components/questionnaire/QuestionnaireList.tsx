import React from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../assets/colors';
import { Questionnaire } from '../../models/Questionnaire';
import Button from '../generic/Button';

const QuestionnaireList = (props: { questionnaire: Questionnaire }) => {
  const questionnaire: Questionnaire = props.questionnaire;
  return (
    <View>
      {questionnaire?.sections?.map((section, index) => {
        <Button
          title="section.title"
          onButtonPress={() => console.log(`Clicked, ${section.title}`)}
          maxAnswers={section.questions?.length}
          answered={
            section.questions?.filter((question) =>
              question.questionOptions?.filter((questionOption) =>
                questionOption.answers?.filter((answer) => answer.answer)
              )
            ).length
          }
        />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuestionnaireList;
