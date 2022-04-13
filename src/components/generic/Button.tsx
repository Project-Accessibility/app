import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FONTS from '../../assets/fonts';

interface buttonProps {
  title: string;
  onButtonPress: () => void;
  maxAnswers?: number;
  answered?: number;
  finished?: boolean;
}

const MasterContainer = ({ title, onButtonPress, maxAnswers, answered, finished }: buttonProps) => {
  const getCurrentColor = () => {
    if (finished) return COLORS.white;
    if (!maxAnswers || !answered) return COLORS.white;
    if (answered < maxAnswers) return COLORS.orange;
    return COLORS.green;
  };

  const getButtonTextWidth = () => {
    return finished ? { width: '65%' } : { width: '75%' };
  };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: getCurrentColor() }]}
      onPress={onButtonPress}
    >
      {finished && (
        <View style={styles.checkIconStack}>
          <Icon style={styles.checkIcon} name="circle" size={40} color={COLORS.green} />
          <Icon
            style={styles.checkIcon}
            name="check-circle-outline"
            size={40}
            color={COLORS.black}
          />
        </View>
      )}
      <Text numberOfLines={1} style={[styles.buttonText, getButtonTextWidth()]}>
        {title}
      </Text>
      {maxAnswers && !finished ? (
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
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
    width: '75%',
  },
  buttonNumbers: {
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
    width: '20%',
    textAlign: 'right',
  },
  checkIconStack: {
    width: 40,
    height: 40,
  },
  checkIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default MasterContainer;
