import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { QuestionOption } from '../../models/QuestionOption';

const OpenQuestion = (props: { questionOption: QuestionOption }) => {
  const questionOption: QuestionOption = props.questionOption;
  const [textValue, setTextValue] = useState(DetermineValue(questionOption));

  return <>
    <TextInput
      style={styles.input}
      placeholder='Voer uw antwoord in'
      multiline={true}
      textAlignVertical={'top'}
      editable={true}
      value={textValue}
      onChangeText={(text) => {setTextValue(text)}}
    />
  </>;
};

function DetermineValue(questionOption: QuestionOption) {
  let textVal = '';

  if (questionOption.answers && questionOption.answers.length > 0) {
    const answer = questionOption.answers.length > 0 ? questionOption.answers[0] : null;
    if (!answer) return;
    let textAnswer = answer.answer ? answer.answer : null;
    if (!textAnswer) return;
    textVal = textAnswer;
  }
  return textVal;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
  input: {
    flex: 1,
    height: 90,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default OpenQuestion;
