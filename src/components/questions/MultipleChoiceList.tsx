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
    <View style={styles.radioButton}>
      {multipleChoiceOptions.map((value, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.productBox,
              {
                backgroundColor: currentValues.includes(value) ? '#e1f5fe33' : '#fff',
                borderColor: currentValues.includes(value) ? COLORS.green : COLORS.darkBlue,
              },
              styles.box,
            ]}
            activeOpacity={0.9}
            onPress={() => selectOption(value, index)}
          >
            <View style={styles.leftProductBox}>
              <View
                style={[
                  styles.icon,
                  {
                    borderColor: currentValues.includes(value) ? COLORS.green : COLORS.darkBlue,
                    width: 18 + 8,
                    height: 18 + 8,
                  },
                  {
                    borderColor: currentValues.includes(value) ? 'transparent' : COLORS.darkBlue,
                  },
                ]}
              >
                <View
                  style={{
                    opacity: currentValues.includes(value) ? 1 : 0,
                  }}
                >
                  <Icon name="check-circle" size={25} color={COLORS.green} />
                </View>
              </View>
            </View>

            <View style={[styles.centerProductBox]}>
              <Text
                style={[
                  {
                    color: '#383838',
                  },
                  styles.text,
                ]}
              >
                {value}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
    // <View accessibilityLabel={'Meerkeuze'}>
    //   <RadioButtonRN
    //     initial={
    //       props.values && props.values.length > 0
    //         ? multipleChoiceQuestions.indexOf(props.values[0]) + 1
    //         : -1
    //     }
    //     data={stringArrayToRadioButtonData(multipleChoiceQuestions)}
    //     selectedBtn={(selected: RadioButtonData) => {
    //       props.onClicked(selected.label);
    //     }}
    //     animationTypes={['zoomIn', 'rotate']}
    //     textStyle={styles.text}
    //     style={styles.radioButton}
    //     boxStyle={styles.box}
    //     activeColor={COLORS.green}
    //     deactiveColor={COLORS.darkBlue}
    //     icon={<Icon name="check-circle" size={25} color={COLORS.green} />}
    //   />
    // </View>
  );
};

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
  productBox: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  productBoxLess: {
    flexDirection: 'row',
    marginTop: 10,
  },
  leftProductBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerProductBox: {
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
  circleFill: {
    borderWidth: 1,
    borderRadius: 10000,
  },
});

export default MasterContainer;
