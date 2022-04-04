import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/generic/Button';
import MasterContainer from '../components/generic/MasterContainer';
import * as RootNavigation from '../helpers/rootNavigation';
import * as MockDataRetriever from '../data/mockData/MockDataRetriever';

const HomeScreen = () => {
  return (
    <MasterContainer>
      <Text>HomeScreen</Text>
      <View style={styles.testButtonPannel}>
        <Button
          title="Onderdeel A"
          onButtonPress={() =>
            RootNavigation.navigate('Questionnaire', {
              questionnaire: MockDataRetriever.getQuestionnaireMock(),
            })
          }
          maxAnswers={3}
          answered={0}
        />
        <Button
          title="Onderdeel B"
          onButtonPress={() => console.log('Button press!')}
          maxAnswers={5}
          answered={2}
        />
        <Button
          title="Onderdeel c"
          onButtonPress={() => console.log('Button press!')}
          maxAnswers={4}
          answered={4}
        />
        <Button title="Vragenlijst A" onButtonPress={() => console.log('Button press!')} />
      </View>
    </MasterContainer>
  );
};
const styles = StyleSheet.create({
  testButtonPannel: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
  },
});

export default HomeScreen;
