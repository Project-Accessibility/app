import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import AudioRecorder from '../components/questions/AudioRecorder';
import Queue from '../data/localStorage/Queue';
import { getQuestionnaireMock } from '../data/mockData/MockDataRetriever';

const HomeScreen = () => {
  useEffect(() => {
    Queue.getInstance();
  }, []);

  return (
    <>
      <CodeInput />
      <MasterContainer>
        <View>
          <AudioRecorder
            onAudioRecorded={function (recordUri: string): void {
              console.log(recordUri);
            }}
          />
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
