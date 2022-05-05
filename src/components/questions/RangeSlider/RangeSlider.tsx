import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QuestionOption } from '../../../models/QuestionOption';
import RangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';
import COLORS from '../../../assets/colors';

const Range = (props: { questionOption: QuestionOption; onClicked: (label: string) => void }) => {
  const range = props.questionOption.extraData as any;
  const [low, setLow] = useState(range.min);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(
    (sliderValue) => {
      setLow(sliderValue);
      props.onClicked(sliderValue);
    },
    [props]
  );

  return (
    <View style={styles.root}>
      <RangeSlider
        style={styles.slider}
        min={range.min}
        max={range.max}
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
        <Text style={styles.valueText}>{low}</Text>
        <Text style={styles.valueText}>{range.max}</Text>
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
  slider: {},
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
  valueText: {
    color: COLORS.black,
    fontSize: 20,
  },
});

export default Range;
