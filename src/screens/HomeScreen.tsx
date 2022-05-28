import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import VideoSelector from '../components/questions/VideoSelector';
import Queue from '../data/localStorage/Queue';
import { getQuestionnaireMock } from '../data/mockData/MockDataRetriever';

const HomeScreen = () => {
  useEffect(() => {
    Queue.getInstance();
  }, []);

  return (
    <>
      <CodeInput />
      <VideoSelector onVideoSelected={(ad: any) => console.log(ad)} value={''} />
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
