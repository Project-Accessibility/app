import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import { getQuestionnaireMock, getQuestionOptionMock } from '../data/mockData/MockDataRetriever';
import RangeSlider from '../components/questions/RangeSlider/RangeSlider';

const HomeScreen = () => {
  return (
    <>
      <CodeInput />
      <RangeSlider
        questionOption={getQuestionOptionMock()}
        onClicked={function (value) {
          console.log(value);
        }}
      />
      <MasterContainer>
        <View>
          <Text style={styles.title}>Vragenlijsten</Text>
          <QuestionnaireList questionnaires={[getQuestionnaireMock(), getQuestionnaireMock()]} />
        </View>
      </MasterContainer>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
    padding: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
