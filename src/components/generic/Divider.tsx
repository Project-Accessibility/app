import React from 'react';
import { View } from 'react-native';
import COLORS from '../../assets/colors';

interface DividerProps {
  width: number | string;
  height: number | string;
  margin?: number | string;
}

const Divider = ({ width, height, margin }: DividerProps) => {
  return (
    <View
      style={{ backgroundColor: COLORS.gray, width: width, height: height, marginVertical: margin }}
    />
  );
};

export default Divider;
