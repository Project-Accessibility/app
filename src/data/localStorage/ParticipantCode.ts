import AsyncStorage from '@react-native-async-storage/async-storage';

class ParticipantCode {
  public static async saveCurrentParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public static async loadCurrentParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }

  public static async addParticipantCodeToCodesInLocalStorage(code: string) {
    let codes = await this.getParticipantCodesFromLocalStorage();
    if (codes == null) {
      codes = [];
    }
    codes.push(code);
    await AsyncStorage.setItem('codes', JSON.stringify(codes));
  }

  public static async getParticipantCodesFromLocalStorage(): Promise<string[] | null> {
    return JSON.parse(<string>await AsyncStorage.getItem('codes'));
  }
}

export default ParticipantCode;
