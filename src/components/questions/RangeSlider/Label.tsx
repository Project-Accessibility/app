import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../assets/colors';

interface Props {
  text: string;
}

const Label: FC<Props> = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: COLORS.teal,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default memo(Label);
