import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import QuestionList from '../components/question/QuestionList';
import { Section } from '../models/Section';

const SectionScreen = () => {
  const [section, setSection] = useState<Section>();

  const route = useRoute();

  useEffect(() => {
    const currentParams = route.params as { section: Section };
    if (!currentParams) return;
    setSection(currentParams.section);
  }, [route.params]);

  return (
    <MasterContainer>
      <ScrollView>
        {!section && <Text>Geen Onderdeel gevonden.</Text>}
        {section?.description && (
          <>
            <View>
              <Text style={styles.questionTitle}>Beschrijving</Text>
              <Divider width="33%" height={2} margin={0} />
              <Text style={styles.questionText}>{section?.description}</Text>
            </View>
            <Divider width="100%" height={3} margin={20} />
          </>
        )}
        {section?.locationDescription && (
          <>
            <View>
              <Text style={styles.questionTitle}>Locatie beschrijving</Text>
              <Divider width="33%" height={2} margin={0} />
              <Text style={styles.questionText}>{section?.locationDescription}</Text>
            </View>
            <Divider width="100%" height={3} margin={20} />
          </>
        )}
        {section?.questions && (
          <>
            <View>
              <Text style={styles.questionsTitle}> Vragen </Text>
              <QuestionList questions={section.questions} />
            </View>
          </>
        )}
      </ScrollView>
    </MasterContainer>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 25,
    color: COLORS.black,
  },
  questionText: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    color: COLORS.black,
  },
  questionsTitle: {
    fontFamily: FONTS.regular,
    fontSize: 35,
    color: COLORS.black,
  },
});
export default SectionScreen;
