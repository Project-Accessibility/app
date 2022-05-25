import AsyncStorage from '@react-native-async-storage/async-storage';

export interface questionnaire {
  code: string;
  name: string;
}

class ParticipantCode {
  public static async saveCurrentParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public static async loadCurrentParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }

  private static codeAppearsInQuestionnaires(questionnaires: questionnaire[], code: string) {
    let codeAppears = false;
    questionnaires.forEach((q) => {
      if (q.code === code) {
        codeAppears = true;
      }
    });
    return codeAppears;
  }

  public static async addQuestionnaireInLocalStorage(questionnaire: questionnaire) {
    let questionnaires = await this.getQuestionnairesFromLocalStorage();
    if (questionnaires === null) {
      questionnaires = [];
    }
    if (!this.codeAppearsInQuestionnaires(questionnaires, questionnaire.code)) {
      questionnaires.push(questionnaire);
    }
    await AsyncStorage.setItem('questionnaires', JSON.stringify(questionnaires));
  }

  public static async getQuestionnairesFromLocalStorage(): Promise<questionnaire[] | null> {
    const result = await AsyncStorage.getItem('questionnaires');
    return result ? JSON.parse(result) : null;
  }
}

export default ParticipantCode;
