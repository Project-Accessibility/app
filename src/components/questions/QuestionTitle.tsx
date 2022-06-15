import React from 'react';
import { StyleSheet, Text } from 'react-native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

const QuestionTitle = (props: { text: string; accLabel?: string; fontSize?: number }) => {
  const styles = createStyleSheet(props.fontSize);
  return (
    <Text
      style={styles.openTextArea}
      accessible={true}
      accessibilityLabel={props.accLabel == undefined ? '' : props.accLabel}
    >
      {props.text}
    </Text>
  );
};

const createStyleSheet = (fontSize: number = 20) => {
  return StyleSheet.create({
    openTextArea: {
      width: '100%',
      paddingTop: 0,
      paddingLeft: 5,
      paddingBottom: 10,
      fontFamily: FONTS.semiBold,
      fontSize: fontSize,
      color: COLORS.black,
    },
  });
};

export default QuestionTitle;
