import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

const OpenTextArea = (props: {
  value?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
}) => {
  return (
    <TextInput
      defaultValue={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      multiline
      numberOfLines={5}
      textAlignVertical="top"
      style={styles.openTextArea}
      accessible={true}
      accessibilityLabel="Open antwoord veld"
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
    height: 5 * 32,
    maxHeight: 5 * 32, //32 is one line
    color: COLORS.black,
  },
});

export default OpenTextArea;
