import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { QuestionOption } from '../../models/QuestionOption';
import FONTS from '../../assets/fonts';
import COLORS from '../../assets/colors';
import { MultipleChoiceExtraData } from '../../models/questionOptionExtraData/MultipleChoiceExtraData';

const MasterContainer = (props: {
  values?: string[];
  questionOption: QuestionOption;
  onClicked: (values: string[]) => void;
}) => {
  const multipleChoiceOptions: string[] = (
    props.questionOption.extra_data as MultipleChoiceExtraData
  ).values;
  const multipleAnswersPossible: boolean = (
    props.questionOption.extra_data as MultipleChoiceExtraData
  ).multiple;
  const [currentValues, setCurrentValues] = useState(props.values ?? []);
  let fadeAnim = new Animated.Value(0);

  const selectOption = (value: any, index: number) => {
    fadeAnim.setValue(index);
    if (currentValues.includes(value)) {
      value = currentValues.filter((currentValue) => {
        return currentValue !== value;
      });
      setCurrentValues(value);
      // fadeOutAnimation();
    } else if (multipleAnswersPossible || currentValues.length === 0) {
      value = [...currentValues, value];
      setCurrentValues(value);
      // fadeInAnimation();
    }
    props.onClicked(value);
  };

  // const fadeInAnimation = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 0,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 500,
  //       delay: 10,
  //       useNativeDriver: true,
  //     }).start();
  //   });
  // };
  //
  // const fadeOutAnimation = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 0,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 500,
  //       delay: 10,
  //       useNativeDriver: true,
  //     }).start();
  //   });
  // };

  return (
    <View
      style={styles.multipleChoice}
      accessibilityLabel={'Meerkeuze'}
      accessibilityHint={
        'Er zijn ' +
        multipleChoiceOptions.length +
        'opties en ' +
        (multipleAnswersPossible
          ? 'er zijn meerdere antwoorden mogelijk'
          : 'er is een antwoord mogelijk')
      }
      accessible={true}
    >
      {multipleChoiceOptions.map((value, index) => {
        const isSelected = currentValues.includes(value);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              {
                backgroundColor: isSelected ? '#e1f5fe33' : '#fff',
                borderColor: isSelected ? COLORS.green : COLORS.darkBlue,
              },
            ]}
            activeOpacity={0.9}
            onPress={() => selectOption(value, index)}
            accessibilityLabel={value + (isSelected ? ', geselecteerd' : '')}
            accessible={true}
          >
            <View style={styles.leftOptionBox}>
              <View
                style={[
                  styles.icon,
                  {
                    borderColor: isSelected ? 'transparent' : COLORS.darkBlue,
                    width: 18 + 8,
                    height: 18 + 8,
                  },
                ]}
              >
                <View style={{ opacity: isSelected ? 1 : 0 }}>
                  <Icon name="check-circle" size={25} color={COLORS.green} />
                </View>
              </View>
            </View>

            <View style={[styles.centerOptionBox]}>
              <Text style={styles.text}>{value}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  multipleChoice: {
    width: '100%',
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
  },
  optionBox: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: COLORS.white,
  },
  leftOptionBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOptionBox: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  circle: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MasterContainer;
