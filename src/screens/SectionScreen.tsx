import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import QuestionList from '../components/question/QuestionList';
import { Section } from '../models/Section';
import { Question } from '../models/Question';
import { triggerSnackbarShort } from '../helpers/popupHelper';
import colors from '../assets/colors';

const SectionScreen = () => {
  const [section, setSection] = useState<Section>();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    const currentParams = route.params as { section: Section; saved: boolean };

    if (!currentParams) return;

    if (currentParams.saved) {
      triggerSnackbarShort('De vraag is opgeslagen', colors.darkBlue);
    }

    setSection(currentParams.section);
  }, [route.params]);

  return (
    <>
      <MasterContainer>
        {!section && <Text>Geen Onderdeel gevonden.</Text>}
        {section?.description && (
          <>
            <View>
              <Text style={styles.questionTitle}>Beschrijving</Text>
              <Text style={styles.questionText}>{section?.description}</Text>
            </View>
            <Divider width="100%" height={3} margin={20} />
          </>
        )}
        {section?.location_description && (
          <>
            <View>
              <Text style={styles.questionTitle}>Locatie beschrijving</Text>
              <Text style={styles.questionText}>{section?.location_description}</Text>
            </View>
            <Divider width="100%" height={3} margin={20} />
          </>
        )}
        {section?.questions && (
          <>
            <View>
              <Text style={styles.questionsTitle}>Vragen</Text>
              {section.questions.length > 0 && (
                <Text
                  style={styles.questionsAnswered}
                  accessible={true}
                  accessibilityLabel={`${determineProgress(section.questions)} van de ${
                    section.questions.length
                  } vragen beantwoord.`}
                >
                  Beantwoord:{' '}
                  {isFocused
                    ? `${determineProgress(section.questions)} / ${section.questions.length}`
                    : ''}
                </Text>
              )}
              <QuestionList section={section} questions={section.questions} />
            </View>
          </>
        )}
      </MasterContainer>
    </>
  );
};

function determineProgress(questions: Question[]): number {
  let amountAnswers = 0;

  for (let question of questions) {
    if (Question.isAnswered(question)) {
      amountAnswers++;
    }
  }

  return amountAnswers;
}

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
  questionsAnswered: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.black,
  },
});
export default SectionScreen;
