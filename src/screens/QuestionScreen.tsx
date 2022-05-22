import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import { Question } from '../models/Question';
import { QuestionOption } from '../models/QuestionOption';
import { QuestionOptionType } from '../enums/QuestionOptionType';
import SaveButton from '../components/generic/SaveButton';
import OpenTextArea from '../components/questions/OpenTextArea';
import Answer from '../models/Answer';
import Queue from '../data/localStorage/Queue';
import { QueueAction } from '../enums/QueueAction';
import RangeSlider from '../components/questions/RangeSlider/RangeSlider';
import AudioRecorder from '../components/questions/AudioRecorder';

const QuestionScreen = () => {
  const route = useRoute();
  const queue = Queue.getInstance();
  const [question, setquestion] = useState<Question>();

  useEffect(() => {
    const currentParams = route.params as { question: Question };
    if (!currentParams) return;
    setquestion(currentParams.question);
  }, [route.params]);

  useEffect(() => {
    return function cleanup() {
      if (!question) return;
      queue.addObjectToQueue(QueueAction.SaveQuestion, question as Object);
    };
  });

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
        <SaveButton question={question} />
      </ScrollView>
    </MasterContainer>
  );
};

function GetElement(questionOption: QuestionOption, index: number) {
  switch (questionOption.type) {
    case QuestionOptionType.OPEN:
      return (
        <OpenTextArea
          defaultValue={questionOption.answer?.values[0]}
          key={index}
          onChangeText={(value: string) => {
            questionOption.answer = {
              id: questionOption.answer?.id ?? 1,
              values: [value],
            } as Answer;
          }}
        />
      );
    case QuestionOptionType.IMAGE:
      break;
    case QuestionOptionType.VIDEO:
      break;
    case QuestionOptionType.VOICE:
      return (
        <AudioRecorder
          onAudioRecorded={function (recordUri: string): void {
            console.log(recordUri);
          }}
        />
      );
    case QuestionOptionType.MULTIPLE_CHOICE:
      break;
    case QuestionOptionType.RANGE:
      return (
        <RangeSlider
          defaultValue={questionOption.answer?.values[0]}
          questionOption={questionOption}
          onChange={(value: number) => {
            questionOption.answer = {
              id: questionOption.answer?.id ?? 1,
              values: [value],
            } as Answer;
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
});

export default QuestionScreen;
