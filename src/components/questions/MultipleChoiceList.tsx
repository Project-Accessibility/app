import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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

  const selectOption = (value: any) => {
    if (currentValues.includes(value)) {
      value = currentValues.filter((currentValue) => {
        return currentValue !== value;
      });
      setCurrentValues(value);
      // @ts-ignore
    } else if (multipleAnswersPossible === '0') {
      value = [value];
      setCurrentValues(value);
      // @ts-ignore
    } else if (multipleAnswersPossible === '1') {
      value = [...currentValues, value];
      setCurrentValues(value);
    }
    props.onClicked(value);
  };

  return (
    <View style={styles.multipleChoice}>
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
            onPress={() => selectOption(value)}
            accessibilityLabel={
              value +
              ', ' +
              (index + 1) +
              ' van de ' +
              multipleChoiceOptions.length +
              (isSelected ? ', geselecteerd' : '')
            }
          >
            <View style={styles.leftOptionBox}>
              <View>
                {isSelected ? (
                  <View>
                    {/* @ts-ignore */}
                    {multipleAnswersPossible === '1' ? (
                      <Icon name="check-square" size={25} color={COLORS.green} solid />
                    ) : (
                      <Icon name="check-circle" size={25} color={COLORS.green} solid />
                    )}
                  </View>
                ) : (
                  <View>
                    {/* @ts-ignore */}
                    {multipleAnswersPossible === '1' ? (
                      <Icon name="square" size={25} color={COLORS.darkBlue} />
                    ) : (
                      <Icon name="circle" size={25} color={COLORS.darkBlue} />
                    )}
                  </View>
                )}
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
