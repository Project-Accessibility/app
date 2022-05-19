import AsyncStorage from '@react-native-async-storage/async-storage';

class ParticipantCode {
  public async SaveParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public async LoadParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }
}

export default ParticipantCode;
