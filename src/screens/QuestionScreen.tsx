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
import RangeSlider from '../components/questions/RangeSlider/RangeSlider';
import AudioRecorder from '../components/questions/AudioRecorder';
import { FileSelectedData } from '../models/questionOptionExtraData/FileSelectedData';
import VideoSelector from '../components/questions/VideoSelector';

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
            {question.options &&
              question.options.map((option, index) => {
                return (
                  <View key={index} style={styles.questionItem}>
                    {getElement(option)}
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

function getAnswerIdFromQuestionOption(questionOption: QuestionOption): number {
  try {
    return questionOption.answer?.id ?? 1;
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
          value={questionOption.answer?.values?.[0] ?? ''}
          onChangeText={(value: string) => {
            questionOption.answer = {
              id: questionOption.answer?.id ?? 1,
              values: [value],
            } as Answer;
          }}
        />
      );
    case QuestionOptionType.IMAGE:
      return (
        <ImageSelector
          value={getMediaURI(questionOption)}
          onImageSelected={(image: FileSelectedData | null) => {
            if (image) {
              questionOption.answer = {
                id: answerId,
                values: [image],
              } as Answer;
            } else {
              questionOption.answer = undefined;
            }
          }}
        />
      );
    case QuestionOptionType.VIDEO:
      return (
        <VideoSelector
          value={getMediaURI(questionOption)}
          onVideoSelected={function (videoPath: FileSelectedData | undefined): void {
            if (videoPath) {
              questionOption.answer = {
                id: answerId,
                values: [videoPath],
              } as Answer;
            } else {
              questionOption.answer = undefined;
            }
          }}
        />
      );
    case QuestionOptionType.VOICE:
      return (
        <AudioRecorder
          value={getMediaURI(questionOption)}
          onAudioRecorded={(audio: FileSelectedData | null) => {
            if (audio) {
              questionOption.answer = {
                id: answerId,
                values: [audio],
              } as Answer;
            } else {
              questionOption.answer = undefined;
            }
          }}
        />
      );
    case QuestionOptionType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceList
          values={questionOption.answer?.values}
          questionOption={questionOption}
          onClicked={(label: string) => {
            questionOption.answer = {
              id: answerId,
              values: [label],
            } as Answer;
          }}
        />
      );
    case QuestionOptionType.RANGE:
      return (
        <RangeSlider
          value={questionOption.answer?.values?.[0]}
          questionOption={questionOption}
          onChange={(value: number) => {
            questionOption.answer = {
              id: answerId,
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

function getMediaURI(questionOption: QuestionOption): string {
  if (questionOption.answer?.values?.[0]?.uri !== undefined) {
    return (questionOption.answer.values[0] as FileSelectedData).uri;
  }
  return questionOption.answer?.values?.[0] ?? '';
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
