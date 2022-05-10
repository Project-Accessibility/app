import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import MasterContainer from '../components/generic/MasterContainer';
import CodeInput from '../components/questionnaire/CodeInput';
import QuestionnaireList from '../components/questionnaire/QuestionnaireList';
import { getQuestionnaireMock } from '../data/mockData/MockDataRetriever';


import storage from '../data/localStorage/TempStorage';



const testing = async () => {
  await storage.clear();
  await storage.saveData('test', 'test');
  await storage.saveData('test2', 'test2');
  await storage.saveData('test3', 'test3');
  await storage.saveData('test4', 'test4');

  console.log('START');
  storage.printQueue();
  await storage.saveData('object1', { test: 'test' });
  storage.printQueue();
  console.log('END');

  console.log('MODIFIED');
  await storage.removeItem('object1');
  await storage.removeItem('test2');
  storage.printQueue();
}

testing();

const HomeScreen = () => {

  return (
    <>
      <CodeInput />
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
