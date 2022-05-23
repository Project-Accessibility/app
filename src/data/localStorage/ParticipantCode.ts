import AsyncStorage from '@react-native-async-storage/async-storage';

class ParticipantCode {
  public static async saveParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public static async loadParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }
}

export default ParticipantCode;
