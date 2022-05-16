import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { QuestionOption } from '../../models/QuestionOption';
import COLORS from '../../assets/colors';
import ACC_STRS from '../../assets/accessibilityStrings';
import FONTS from '../../assets/fonts';
import TempStorage from '../../data/localStorage/TempStorage';
import { Answer } from '../../models/Answer';
import OpenTextArea from '../questions/OpenTextArea';

const OpenQuestion = (props: { questionOption: QuestionOption }) => {
  let textVal = '';
  const questionOption: QuestionOption = props.questionOption;
  const [textValue, setTextValue] = useState(textVal);
  const [shouldSave, setShouldSave] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);

  const load = async () => {
    await DetermineValue(questionOption)
      .then((e) => {
        setTextValue(e);
        console.log(`Found a value in load: ${e}`);
      })
      .catch((e) => console.log(`O no! Found error: ${e}`));
  };

  const save = async () => {
    await Save(questionOption, textValue);
  };

  const clear = async () => {
    await clearQueue();
  };

  useEffect(() => {
    if (shouldClear) {
      clear();
      setShouldClear(false);
    }
  }, [shouldClear]);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    // Save button does not work for saving. Auto save when leave textbox.
    if (shouldSave) {
      save();
      setShouldSave(false);
    }
  }, [shouldSave]);

  return (
    <>
      <OpenTextArea
        placeholder={ACC_STRS.questionOpenPlaceHolder}
        editable={true}
        value={textValue}
        onChangeText={(text) => {
          setTextValue(text);
        }}
        onEndEditing={() => {
          setShouldSave(true);
        }}
      />
      <TouchableOpacity style={styles.buttonView}>
        <Text style={styles.buttonText}>Opslaan</Text>
        {/*TODO Opslaan en teruggaan van maken? */}
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.buttonView}>*/}
      {/*  <Text style={styles.buttonText} onPress={() => setShouldClear(true)}>*/}
      {/*    Clear*/}
      {/*  </Text>*/}
      {/*  /!* TODO remove when upload to api implemented*!/*/}
      {/*</TouchableOpacity>*/}
    </>
  );
};

async function clearQueue() {
  const s1 = TempStorage.getInstance();
  await s1.clear();
}

async function Save(questionOption: QuestionOption, newTextValue: string) {
  const s1 = TempStorage.getInstance();

  if (questionOption.answers) {
    for (const answer of questionOption.answers) {
      if (answer?.answer && answer.answer.length > 0) {
        answer.answer[0] = newTextValue;

        // questionOption id + answer id
        await s1
          .saveData(FormattedStorageName(questionOption, answer), questionOption)
          .then(() => {
            if (Platform.OS === 'android') {
              ToastAndroid.show(ACC_STRS.saveButton, ToastAndroid.SHORT);
              s1.viewQueue();
            } else {
              // AlertIOS.alert(ACC_STRS.saveButton); //TODO ios alert
            }
          }) // TODO add Toast equivalent for ios
          .catch((e) => console.log(e));
      }
    }
  }
}

function FormattedStorageName(questionOption: QuestionOption, answer: Answer) {
  return `${questionOption.id},${answer.id}`;
}

async function DetermineValue(questionOption: QuestionOption) {
  let textVal = '';
  let s1 = TempStorage.getInstance();

  // Search local storage for answer
  // First check local queue. It contains the datetime of a each saved answer that
  // has not yet been saved to the server.
  // TODO use api to get the latest answer
  // TODO If local answer is newer than API answer, use local answer.

  if (questionOption.answers && questionOption.answers.length > 0) {
    const answer = questionOption.answers[0];
    let name = answer !== null ? FormattedStorageName(questionOption, answer) : null;
    if (name) {
      let olderData: QuestionOption = (await s1
        .tryGetModelFromLocalStorage(name)
        .catch((e) => console.log(`error in DetermineValue: ${e}`))) as QuestionOption;

      if (olderData) {
        olderData.answers?.forEach((ans) => {
          ans.answer?.forEach((a) => {
            textVal = a;
          });
        });
      } else {
        if (!answer) return textVal;
        let textAnswer = answer.answer ? answer.answer[0] : null;
        if (!textAnswer) return textVal;
        textVal = textAnswer;
      }
    }
  }

  return textVal;
}

const styles = StyleSheet.create({
  buttonView: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.extraBold,
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: 120,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    fontSize: 17,
    fontWeight: '400',
  },
});

export default OpenQuestion;
