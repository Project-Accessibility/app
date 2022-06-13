import React from 'react';
import { StyleSheet, Text } from 'react-native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

const QuestionTitle = (props: { text: string }) => {
  return (
    <Text style={styles.openTextArea} accessible={true}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  openTextArea: {
    width: '100%',
    paddingTop: 0,
    paddingLeft: 5,
    paddingBottom: 10,
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    color: COLORS.black,
  },
});

export default QuestionTitle;
