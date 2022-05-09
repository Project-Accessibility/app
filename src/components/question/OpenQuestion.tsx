import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { QuestionOption } from '../../models/QuestionOption';
import COLORS from '../../assets/colors';
import ACC_STRS from '../../assets/accessibilityStrings';
import FONTS from '../../assets/fonts';

const OpenQuestion = (props: { questionOption: QuestionOption }) => {
  const questionOption: QuestionOption = props.questionOption;
  const [textValue, setTextValue] = useState(DetermineValue(questionOption));

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={ACC_STRS.questionOpenPlaceHolder}
        multiline={true}
        textAlignVertical={'top'}
        editable={true}
        value={textValue}
        onChangeText={(text) => {
          setTextValue(text);
        }}
      />
      <TouchableOpacity onPress={() => Save(questionOption, textValue)} style={styles.buttonView}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </>
  );
};

function Save(questionOption: QuestionOption, textValue: string) {
  questionOption.answers?.forEach((e) => {
    if (e.answer !== textValue) {
      e.answer = textValue;
    }
  });
}

function DetermineValue(questionOption: QuestionOption) {
  let textVal = '';

  if (questionOption.answers && questionOption.answers.length > 0) {
    const answer = questionOption.answers.length > 0 ? questionOption.answers[0] : null;
    if (!answer) return textVal;
    let textAnswer = answer.answer ? answer.answer[0] : null;
    if (!textAnswer) return textVal;
    textVal = textAnswer;
  }
  return textVal;
}

const styles = StyleSheet.create({
  buttonView: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.extraBold,
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: 120,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    fontSize: 17,
    fontWeight: '400',
  },
});

export default OpenQuestion;
