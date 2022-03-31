import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';

const SectionScreen = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.bottomText}>Onderdeel</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionTitle}>Beschrijving</Text>
        <View style={styles.descriptionLine} />
        {/*TODO: of statement met database gegevens als er beschrijving bestaat */}
        <Text style={styles.descriptionText}>Er is voor dit onderdeel geen beschrijving </Text>
        <View style={styles.descriptionLineQuestions} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.white,
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    height: '20%',
  },
  bottomText: {
    color: COLORS.white,
    fontSize: 40,
    fontFamily: 'Muli-SemiBold',
    textAlign: 'center',
    alignContent: 'center',
  },
  descriptionTitle: {
    top: '10%',
    left: '10%',
    color: 'black',
    fontSize: 25,
    fontFamily: 'Muli-ExtraBold',
  },
  containerDescription: {
    height: '30%',
  },
  descriptionText: {
    top: '18%',
    left: '10%',
    width: '80%',
    fontSize: 20,
  },
  descriptionLine: {
    top: '14%',
    left: '10%',
    width: '40%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  descriptionLineQuestions: {
    top: '25%',
    width: '85%',
    alignSelf: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 3,
    borderRadius: 20,
  },
});

export default SectionScreen;
