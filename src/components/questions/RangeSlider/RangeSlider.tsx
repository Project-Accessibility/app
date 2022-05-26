import React, { useCallback, useState } from 'react';
import { ToastAndroid, Platform, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { QuestionOption } from '../../../models/QuestionOption';
import RangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';
import COLORS from '../../../assets/colors';
import FONTS from '../../../assets/fonts';
const sliderWidth = '80%';
const inputFieldWidth = '15%';

const Range = (props: {
  questionOption: QuestionOption;
  value: number;
  onChange: (label: number) => void;
}) => {
  const range = props.questionOption.extra_data as any;
  const [currentValue, setCurrentValue] = useState(props.value ?? range.min);
  const [textValue, setTextValue] = useState(String(range.min));

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(
    (value: any) => {
      if (typeof value === 'string') {
        setTextValue(value);
        value = Number.parseInt(value, 10);
        if (Number.isNaN(value)) {
          value = currentValue;
        } else if (value < range.min) {
          showToast('Minimum waarde is ' + range.min);
          value = range.min;
          setTextValue(String(value));
        } else if (value > range.max) {
          showToast('Maximum waarde is ' + range.max);
          value = range.max;
          setTextValue(String(value));
        }
      }
      if (currentValue !== value) {
        setTextValue(String(value));
        setCurrentValue(value);
        props.onChange(value);
      }
    },
    [currentValue, props, range.max, range.min]
  );

  function showToast(msg: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      Alert.alert(msg);
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View
          style={styles.slider}
          accessibilityLabel={'Slider'}
          accessibilityHint={`Tussen ${range.min} en ${range.max}. In het tekstvak hiernaast kan je direct de waarde invullen in plaats van de slider te gebruiken.`}
        >
          <RangeSlider
            min={range.min}
            max={range.max}
            low={currentValue}
            disableRange={true}
            step={range.step}
            floatingLabel={true}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={styles.horizontalContainer}>
            <Text style={styles.valueText}>{range.min}</Text>
            <Text style={styles.valueText}>{range.max}</Text>
          </View>
        </View>
        <TextInput
          style={styles.rangeInput}
          placeholderTextColor={COLORS.black}
          keyboardType="numeric"
          onChangeText={handleValueChange}
          value={String(textValue)}
          accessible={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    paddingLeft: 12,
    paddingRight: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  slider: {
    width: sliderWidth,
    marginRight: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: 6,
  },
  valueText: {
    color: COLORS.black,
    fontSize: 20,
  },
  rangeInput: {
    backgroundColor: COLORS.white,
    width: inputFieldWidth,
    borderWidth: 2,
    borderRadius: 20,
    flexGrow: 1,
    marginRight: 2,
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: FONTS.semiBold,
    fontSize: 20,
  },
});

export default Range;
