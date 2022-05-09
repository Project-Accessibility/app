import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import { Question } from '../models/Question';
import { QuestionOption } from '../models/QuestionOption';
import OpenQuestion from '../components/question/OpenQuestion';
import { QuestionOptionType } from '../enums/QuestionOptionType';

const QuestionScreen = () => {
  const route = useRoute();
  const [question, setquestion] = useState<Question>();

  useEffect(() => {
    const currentParams = route.params as { question: Question };
    if (!currentParams) return;
    setquestion(currentParams.question);
  }, [route.params]);

  return (
    <MasterContainer>
      <ScrollView>
        {!question && <Text>Geen vraag gevonden.</Text>}
        {question?.question && (
          <>
            <View>
              <Text style={styles.questionTitle}>Vraag</Text>
              <Divider width="33%" height={2} margin={0} />
              <Text style={styles.questionText}>{question.question}</Text>
            </View>
            <Divider width="100%" height={3} margin={20} />
            {question.questionOptions &&
              question.questionOptions.map((questionOption, index) =>
                GetElement(questionOption, index)
              )}
          </>
        )}
      </ScrollView>
    </MasterContainer>
  );
};

function GetElement(questionOption: QuestionOption, index: number) {
  switch (questionOption.type) {
    case QuestionOptionType.OPEN:
      return <OpenQuestion questionOption={questionOption} key={index} />;
    case QuestionOptionType.IMAGE:
      break;
    case QuestionOptionType.VIDEO:
      break;
    case QuestionOptionType.VOICE:
      break;
    case QuestionOptionType.MULTIPLE_CHOICE:
      break;
    case QuestionOptionType.DATE:
      break;
    case QuestionOptionType.DATETIME:
      break;
  }
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
});

export default QuestionScreen;
