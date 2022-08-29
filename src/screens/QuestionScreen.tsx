import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import QuestionTitle from '../components/questions/QuestionTitle';
import accessibilityStrings from '../assets/accessibilityStrings';
import { Section } from '../models/Section';

const QuestionScreen = () => {
  const route = useRoute();
  const queue = Queue.getInstance();
  const [question, setQuestion] = useState<Question>();
  const [section, setSection] = useState<Section>();

  useEffect(() => {
    const currentParams = route.params as { question: Question; section: Section };
    if (!currentParams) return;
    setQuestion(currentParams.question);
    setSection(currentParams.section);
  }, [route.params]);

  useEffect(() => {
    return function cleanup() {
      if (!question) return;
      queue.addObjectToQueue(QueueAction.SaveQuestion, question as Object);
    };
  });

  return (
    <MasterContainer>
      <KeyboardAvoidingView behavior="height">
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
              <Text
                accessibilityLabel={getAnswersTypesAccessibilityString(question)}
                style={styles.questionTitle}
              >
                Antwoordmogelijkheden
              </Text>
              <Divider width="33%" height={2} margin={0} />
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
          <SaveButton section={section} question={question} />
        </ScrollView>
      </KeyboardAvoidingView>
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
        <>
          <QuestionTitle text={getDutchTextForQuestionOptionType(QuestionOptionType.OPEN) ?? ''} />
          <OpenTextArea
            placeholder={questionOption.extra_data.placeholder}
            value={questionOption.answer?.values?.[0] ?? ''}
            onChangeText={(value: string) => {
              questionOption.answer = {
                id: questionOption.answer?.id ?? 1,
                values: [value],
              } as Answer;
            }}
          />
        </>
      );
    case QuestionOptionType.IMAGE:
      return (
        <>
          <QuestionTitle
            accLabel={accessibilityStrings.questionTitlePhoto}
            text={getDutchTextForQuestionOptionType(QuestionOptionType.IMAGE) ?? ''}
          />
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
        </>
      );
    case QuestionOptionType.VIDEO:
      return (
        <>
          <QuestionTitle
            accLabel={accessibilityStrings.questionTitleVideo}
            text={getDutchTextForQuestionOptionType(QuestionOptionType.VIDEO) ?? ''}
          />
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
        </>
      );
    case QuestionOptionType.VOICE:
      return (
        <>
          <QuestionTitle
            accLabel={accessibilityStrings.questionTitleAudio}
            text={getDutchTextForQuestionOptionType(QuestionOptionType.VOICE) ?? ''}
          />
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
        </>
      );
    case QuestionOptionType.MULTIPLE_CHOICE:
      // create label for multiple choice
      const amountAnswerPossibilities = questionOption.extra_data?.values?.length ?? 0;
      const multiplePossibilities = questionOption.extra_data?.multiple ?? false;

      const label = `Meerkeuze. Er zijn in totaal ${amountAnswerPossibilities} opties. ${
        multiplePossibilities
          ? 'Er zijn meerdere antwoorden mogelijk.'
          : 'Er is één antwoord mogelijk.'
      }`;

      return (
        <>
          <QuestionTitle accLabel={label} text={'Meerkeuze'} />
          <MultipleChoiceList
            values={questionOption.answer?.values}
            questionOption={questionOption}
            onClicked={(values: string[]) => {
              questionOption.answer = {
                id: answerId,
                values: values,
              } as Answer;
            }}
          />
        </>
      );
    case QuestionOptionType.RANGE:
      return (
        <>
          <QuestionTitle text={'Schaal'} />
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
        </>
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

function getAnswersTypesAccessibilityString(question: Question): string {
  if (question.options === undefined || question.options.length === 0)
    return 'Er zijn geen antwoord mogelijkheden.';

  let optionsLength = question.options.length;
  let singleAnswerType = optionsLength === 1;

  let accessibilityString = singleAnswerType
    ? `Antwoordmogelijkheden. Er is 1 antwoordmogelijkheid. Dit is`
    : `Antwoordmogelijkheden. Er zijn ${optionsLength} antwoordmogelijkheden. Dit zijn`;

  for (const [index, option] of question.options.entries()) {
    let dutchText = getDutchTextForQuestionOptionType(option.type) ?? option.type;

    if (singleAnswerType) {
      accessibilityString += `een ${dutchText}.`;
    }

    index === question.options.length - 1
      ? (accessibilityString += `en een ${dutchText}.`)
      : (accessibilityString += `een ${dutchText},`);
  }

  return accessibilityString;
}

function getDutchTextForQuestionOptionType(type: QuestionOptionType): string | null {
  switch (type) {
    case QuestionOptionType.OPEN:
      return 'open antwoord';
    case QuestionOptionType.IMAGE:
      return 'afbeelding';
    case QuestionOptionType.VIDEO:
      return 'video opname';
    case QuestionOptionType.RANGE:
      return 'slider';
    case QuestionOptionType.VOICE:
      return 'audio opname';
    case QuestionOptionType.MULTIPLE_CHOICE:
      return 'meerkeuze';
    default:
      console.error('Een antwoordmogelijkheid heeft geen vertaling');
      return null;
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
