import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import COLORS from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface buttonProps {
  title: string;
  onButtonPress: () => void;
  maxAnswers?: number;
  answered?: number;
  finished?: boolean;
}

const MasterContainer = ({ title, onButtonPress, maxAnswers, answered, finished }: buttonProps) => {
  const getCurrentColor = () => {
    if (finished) return COLORS.green;
    if (!maxAnswers || !answered) return COLORS.white;
    if (answered < maxAnswers) return COLORS.orange;
    return COLORS.green;
  };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: getCurrentColor() }]}
      onPress={onButtonPress}
    >
      <Text numberOfLines={1} style={styles.buttonText}>
        {title}
      </Text>
      {maxAnswers ? (
        answered ? (
          <Text numberOfLines={1} style={styles.buttonNumbers}>
            {answered}/{maxAnswers}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.buttonNumbers}>
            0/{maxAnswers}
          </Text>
        )
      ) : (
        <Icon name="chevron-right" size={50} color={COLORS.black} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 25,
    color: COLORS.black,
    width: '75%',
  },
  buttonNumbers: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 25,
    color: COLORS.black,
    width: '20%',
    textAlign: 'right',
  },
  checkIconOverlap: {
    position: 'relative',
    width: 40,
    height: 40,
    marginRight: 10,
    // borderWidth: 2,
  },
});

export default MasterContainer;
