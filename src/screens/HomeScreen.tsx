import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import ParticipantCode, { questionnaire } from '../data/localStorage/ParticipantCode';
import Queue from '../data/localStorage/Queue';

const HomeScreen = () => {
  const [questionnaires, setQuestionnaires] = useState<questionnaire[]>([]);

  useEffect(() => {
    Queue.getInstance();

    initQuestionnaires();
  }, []);

  const initQuestionnaires = async () => {
    const result = await ParticipantCode.getQuestionnairesFromLocalStorage();
    if (!result) return setQuestionnaires([]);
    setQuestionnaires(result);
  };

  return (
    <>
      <CodeInput />
      <MasterContainer>
        <View>
          <Text style={styles.title}>Vragenlijsten</Text>
          <QuestionnaireList questionnaires={questionnaires} />
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
