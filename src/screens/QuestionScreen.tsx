import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import ImageUpload from '../components/questions/ImageUpload';
import MultipleChoiceList from '../components/questions/MultipleChoiceList';
import OpenTextArea from '../components/questions/OpenTextArea';
import { QuestionOptionType } from '../enums/QuestionOptionType';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { QuestionOption } from '../models/QuestionOption';

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
              question.questionOptions.map((questionOption, index) => {
                return (
                  <View key={index} style={styles.questionItem}>
                    {getElement(questionOption)}
                  </View>
                );
              })}
          </>
        )}
      </ScrollView>
    </MasterContainer>
  );
};

function getElement(questionOption: QuestionOption) {
  switch (questionOption.type) {
    case QuestionOptionType.OPEN:
      return <OpenTextArea />;
    case QuestionOptionType.IMAGE:
      return (
        <ImageUpload
          onImageSelected={function (base64Image: string): void {
            questionOption.answers = [
              {
                id: questionOption.answers?.[0].id ?? 1,
                answer: [base64Image] as unknown as JSON,
                createdAt: new Date(),
              } as Answer,
            ];
          }}
        />
      );
    case QuestionOptionType.VIDEO:
      break;
    case QuestionOptionType.VOICE:
      break;
    case QuestionOptionType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceList
          questionOption={questionOption}
          onClicked={function (label: string): void {
            questionOption.answers = [
              {
                id: questionOption.answers?.[0].id ?? 1,
                answer: [label] as unknown as JSON,
                createdAt: new Date(),
              } as Answer,
            ];
          }}
        />
      );
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
  questionItem: {
    marginBottom: 10,
  },
});

export default QuestionScreen;
