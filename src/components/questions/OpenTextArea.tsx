import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

const OpenTextArea = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      multiline
      numberOfLines={5}
      textAlignVertical="top"
      style={styles.openTextArea}
    />
  );
};

const styles = StyleSheet.create({
  openTextArea: {
    width: '100%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: FONTS.regular,
    fontSize: 20,
    maxHeight: 5 * 32, //32 is one line
    color: COLORS.black,
  },
});

export default OpenTextArea;
