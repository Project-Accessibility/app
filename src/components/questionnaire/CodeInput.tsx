import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';

const CodeInput = () => {
  const [code, setCode] = useState<String>('');

  return (
    <View style={styles.codeForm}>
      <TextInput
        style={styles.codeInput}
        placeholder="code invoeren..."
        placeholderTextColor={COLORS.black}
        onChangeText={(value: String) => setCode(value)}
      />
      <TouchableOpacity style={styles.codeButton} onPress={() => console.log(code)}>
        <Icon name="chevron-right" size={60} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  codeForm: {
    backgroundColor: COLORS.darkBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  codeInput: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
    width: '55%',
    marginRight: 2,
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: FONTS.semiBold,
    fontSize: 20,
  },
  codeButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 2,
  },
});

export default CodeInput;
