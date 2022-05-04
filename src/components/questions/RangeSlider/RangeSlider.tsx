import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { QuestionOption } from '../../../models/QuestionOption';
import RangeSlider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';

const Range = (props: { questionOption: QuestionOption; onClicked: (label: string) => void }) => {
  const range = props.questionOption.extraData as any;

  const [low, setLow] = useState(range.min);
  const [high, setHigh] = useState(range.max);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((min, max) => {
    setLow(min);
    setHigh(max);
  }, []);

  return (
    <RangeSlider
      style={styles.slider}
      min={low}
      max={high}
      step={range.step}
      floatingLabel
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      onValueChanged={handleValueChange}
    />
  );
};

const styles = StyleSheet.create({
  slider: {},
});

export default Range;
