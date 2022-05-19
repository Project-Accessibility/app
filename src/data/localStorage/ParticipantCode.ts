import AsyncStorage from '@react-native-async-storage/async-storage';

class ParticipantCode {
  public static async SaveParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public static async LoadParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }
}

export default ParticipantCode;
