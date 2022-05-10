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

const SectionScreen = () => {
  const [section, setSection] = useState<Section>();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    const currentParams = route.params as { section: Section };
    if (!currentParams) return;
    setSection(currentParams.section);
  }, [route.params]);

  return (
    <MasterContainer>
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
            <Text style={styles.questionsTitle}>Vragen</Text>
            <Text style={styles.questionsAnswered}>
              Beantwoord: {isFocused ? `${determineProgress(section.questions)} / ${section.questions.length}` : ''}
            </Text>
            <QuestionList questions={section.questions} />
          </View>
        </>
      )}
    </MasterContainer>
  );
};

function determineProgress(questions: Question[]): number {
  let amountAnswers = 0;

  for (let question of questions) {
    if (!question.questionOptions) continue;

    for (let option of question.questionOptions) {
      if (!option.answers) continue;
      if (option.answers.length < 1) continue;

      let answer = option.answers[0].answer;

      if (answer === undefined || answer[0] === '') continue;
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
