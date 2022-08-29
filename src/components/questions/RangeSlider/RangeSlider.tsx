import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { QuestionOption } from '../../../models/QuestionOption';
import RangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';
import COLORS from '../../../assets/colors';
import FONTS from '../../../assets/fonts';
import { triggerSnackbarShort } from '../../../helpers/popupHelper';
import Colors from '../../../assets/colors';

const Range = (props: {
  questionOption: QuestionOption;
  value: number;
  onChange: (label: number) => void;
}) => {
  const range = props.questionOption.extra_data as any;
  const [currentValue, setCurrentValue] = useState(props.value ?? parseInt(range.min));
  const [textValue, setTextValue] = useState(String(currentValue ?? range.min));

  console.log(`Huidige waarde: ${currentValue}`);
  console.log(`Huidige type: ${typeof currentValue}`);

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
        } else if (value < parseInt(range.min)) {
          triggerSnackbarShort('Minimum waarde is ' + range.min, Colors.darkBlue);
          value = parseInt(range.min);
          setTextValue(String(value));
        } else if (value > parseInt(range.max)) {
          triggerSnackbarShort('Maximum waarde is ' + range.max, Colors.darkBlue);
          value = parseInt(range.max);
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

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View
          style={styles.slider}
          accessibilityLabel={'Slider'}
          accessibilityHint={`Tussen ${range.min} en ${range.max}. In het volgende tekstveld kan je direct de waarde invullen in plaats van de slider te gebruiken.`}
        >
          <RangeSlider
            min={parseInt(range.min)}
            max={parseInt(range.max)}
            low={typeof currentValue === 'string' ? parseInt(currentValue) : currentValue}
            disableRange={true}
            step={parseInt(range.step)}
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
          style={styles.input}
          placeholderTextColor={COLORS.black}
          keyboardType="numeric"
          onChangeText={handleValueChange}
          value={String(textValue)}
          accessible={true}
          textAlign={'center'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  slider: {
    marginRight: 10,
    width: '100%',
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
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
    flexGrow: 1,
    marginRight: 2,
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    color: COLORS.black,
  },
});

export default Range;
