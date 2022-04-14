import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/generic/Button';
import MasterContainer from '../components/generic/MasterContainer';
import { getQuestionnaireMock } from '../data/mockData/MockDataRetriever';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <MasterContainer>
      <Button
        title="components"
        onButtonPress={() =>
          // @ts-ignore next-line
          navigation.navigate('Components')
        }
      />
      <Text>HomeScreen</Text>
      <View style={styles.testButtonPannel}>
        <Button
          title={getQuestionnaireMock().title}
          onButtonPress={() =>
            // @ts-ignore next-line
            navigation.navigate('Questionnaire', {
              title: getQuestionnaireMock().title,
              questionnaire: getQuestionnaireMock(),
            })
          }
        />
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
