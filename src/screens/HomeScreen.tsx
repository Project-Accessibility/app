import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import ParticipantCode, { QuestionnaireDisplay } from '../data/localStorage/ParticipantCode';
import Queue from '../data/localStorage/Queue';

const HomeScreen = () => {
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireDisplay[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    Queue.getInstance();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (refresh) {
        initQuestionnaires();
        setRefresh(false);
      }
    }, [refresh])
  );

  const initQuestionnaires = async () => {
    const result = await ParticipantCode.getQuestionnairesFromLocalStorage();
    if (!result) return setQuestionnaires([]);
    setQuestionnaires(result);
  };

  return (
    <>
      <CodeInput setRefresh={setRefresh} />
      <MasterContainer>
        <View>
          <Text
            accessibilityLabel="Vragenlijsten"
            accessibilityHint={
              questionnaires.length > 0
                ? questionnaires.length > 1
                  ? `Er zijn ${questionnaires.length} vragenlijsten opgeslagen`
                  : 'Er is 1 vragenlijst opgeslagen'
                : 'Er zijn geen vragenlijsten opgeslagen'
            }
            style={styles.title}
          >
            Vragenlijsten
          </Text>
          <ScrollView>
            <QuestionnaireList setRefresh={setRefresh} questionnaires={questionnaires.reverse()} />
          </ScrollView>
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
