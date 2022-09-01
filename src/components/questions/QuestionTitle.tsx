import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';
import Divider from '../generic/Divider';

const QuestionTitle = (props: { text: string; accLabel?: string; fontSize?: number }) => {
  const styles = createStyleSheet(props.fontSize);
  return (
    <View style={styles.container}>
      <Text
        style={styles.openTextArea}
        accessible={true}
        accessibilityLabel={props.accLabel == undefined ? '' : props.accLabel}
      >
        {props.text}
      </Text>
      <Divider width="100%" height={2} margin={0} />
    </View>
  );
};

const createStyleSheet = (fontSize: number = 20) => {
  return StyleSheet.create({
    openTextArea: {
      width: '100%',
      padding: 0,
      fontFamily: FONTS.semiBold,
      fontSize: fontSize,
      color: COLORS.black,
    },
    container: {
      paddingBottom: 10,
    },
  });
};

export default QuestionTitle;
