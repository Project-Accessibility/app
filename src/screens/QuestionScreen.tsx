import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import ImageSelector from '../components/questions/ImageSelector';
import MultipleChoiceList from '../components/questions/MultipleChoiceList';
import { Question } from '../models/Question';
import { QuestionOption } from '../models/QuestionOption';
import { QuestionOptionType } from '../enums/QuestionOptionType';
import SaveButton from '../components/generic/SaveButton';
import OpenTextArea from '../components/questions/OpenTextArea';
import Answer from '../models/Answer';
import Queue from '../data/localStorage/Queue';
import { QueueAction } from '../enums/QueueAction';
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
              question.questionOptions.map((questionOption, index) => {
                return (
                  <View key={index} style={styles.questionItem}>
                    {getElement(questionOption)}
                  </View>
                );
              })}
          </>
        )}
        <SaveButton question={question} />
      </ScrollView>
    </MasterContainer>
  );
};

function getAnswerIdFromQuestionOption(questionOption: QuestionOption): Number {
  try {
    return questionOption.answers?.[0].id ?? 1;
  } catch (_) {
    return 1;
  }
}

function getElement(questionOption: QuestionOption) {
  const answerId = getAnswerIdFromQuestionOption(questionOption);
  switch (questionOption.type) {
    case QuestionOptionType.OPEN:
      return (
        <OpenTextArea
          defaultValue={questionOption.answers?.[0].answer?.[0] ?? ''}
          onChangeText={(value: string) => {
            questionOption.answers = [
              {
                id: answerId,
                answer: [value],
              } as Answer,
            ];
          }}
        />
      );
    case QuestionOptionType.IMAGE:
      return (
        <ImageSelector
          defaultValue={questionOption.answers?.[0] ? questionOption.answers?.[0].answer?.[0] : ''}
          onImageSelected={(imagePath: string) => {
            questionOption.answers = [
              {
                id: answerId,
                answer: [imagePath],
              } as Answer,
            ];
          }}
          onImageRemoved={() => {
            questionOption.answers = [
              {
                id: answerId,
                answer: [],
              } as unknown as Answer,
            ];
          }}
        />
      );
    case QuestionOptionType.VIDEO:
      break;
    case QuestionOptionType.VOICE:
      return (
        <AudioRecorder
          onAudioRecorded={function (recordUri: string): void {
            questionOption.answers = [
              {
                id: answerId,
                answer: [recordUri],
              } as Answer,
            ];
          }}
        />
      );
    case QuestionOptionType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceList
          questionOption={questionOption}
          onClicked={(label: string) => {
            questionOption.answers = [
              {
                id: answerId,
                answer: [label],
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
