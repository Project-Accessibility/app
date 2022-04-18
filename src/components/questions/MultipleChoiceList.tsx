import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from 'radio-buttons-react-native';
import { QuestionOption } from '../../models/QuestionOption';
import FONTS from '../../assets/fonts';
import COLORS from '../../assets/colors';

interface RadioButtonData {
  label: string;
}

const MasterContainer = (props: {
  questionOption: QuestionOption;
  onClicked: (label: string) => void;
}) => {
  const multipleChoiceQuestions = props.questionOption.extraData as unknown as string[];

  return (
    <RadioButtonRN
      data={stringArrayToRadioButtonData(multipleChoiceQuestions)}
      selectedBtn={(selected: RadioButtonData) => {
        props.onClicked(selected.label);
      }}
      animationTypes={['zoomIn', 'rotate']}
      textStyle={styles.text}
      style={styles.radioButton}
      boxStyle={styles.box}
      activeColor={COLORS.green}
      deactiveColor={COLORS.darkBlue}
      icon={<Icon name="check-circle" size={25} color={COLORS.green} />}
    />
  );
};

function stringArrayToRadioButtonData(stringArray: string[]): RadioButtonData[] {
  return stringArray.map((string) => {
    return {
      label: string,
    };
  });
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
  },
  radioButton: {
    width: '100%',
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
  },
});

export default MasterContainer;