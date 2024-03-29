import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { QueueAction } from '../../enums/QueueAction';
import { Question } from '../../models/Question';
import { Questionnaire } from '../../models/Questionnaire';
import { saveQuestionByIdAndCode, saveQuestionnaireByCode } from '../api/Questionnaire';
import ParticipantCode from './ParticipantCode';

interface QueueOptions {
  executeTimeout: number; // Execute queue every executeTimeout:number seconds
  errorThreshold: number; // When errorThreshold:number requests fail, trip the circuit resetTimeout:number
  resetTimeout: number; // After resetTimeout:number seconds, try again.
}

class TempStorage {
  private static instance: TempStorage;
  private objectQueue: QueueObjectType[] = [];
  private isConnected: boolean = false;
  private options: QueueOptions;
  private requestsFailed = 0;

  private constructor(options: QueueOptions) {
    this.options = options;
    this.loadQueueFromLocalStorage();
    NetInfo.fetch().then((state) => {
      console.log('Is connected?', state.isConnected);
      this.isConnected = state.isConnected ?? false;
    });
    setInterval(() => this.executeQueue(), this.options.executeTimeout);
  }

  public static getInstance(): TempStorage {
    if (!TempStorage.instance) {
      TempStorage.instance = new TempStorage({
        executeTimeout: 15000,
        errorThreshold: 4,
        resetTimeout: 3000,
      });
    }
    return TempStorage.instance;
  }

  private loadQueueFromLocalStorage() {
    AsyncStorage.getItem('Queue')
      .then((result: string | null) => {
        if (result === null) this.objectQueue = [];
        else this.objectQueue = JSON.parse(result);
      })
      .catch((_: Error) => {
        this.objectQueue = [];
      });
  }

  public async addObjectToQueue(action: QueueAction, object: Object) {
    const participantCode = await ParticipantCode.loadCurrentParticipantCodeFromLocalStorage();
    if (!participantCode) return;

    let newQueueObject: QueueObjectType = {
      key: this.generateKey(action, object),
      action: action,
      object: object,
      participantCode: participantCode,
    };

    for (let i = 0; i < this.objectQueue.length; i++) {
      if (this.objectQueue[i].key === newQueueObject.key) {
        this.objectQueue[i] = newQueueObject;
        return;
      }
    }
    this.objectQueue.push(newQueueObject);

    await this.saveQueueToLocalStorage();
  }

  private generateKey(action: QueueAction, object: Object): string {
    switch (action) {
      case QueueAction.SaveQuestion:
        const question = object as Question;
        return `${question.id}-question`;
      case QueueAction.SaveQuestionnaire:
        const questionnaire = object as Questionnaire;
        return `${questionnaire.id}-questionnaire`;
    }
  }

  private async removeObjectFromQueue(queueObject: QueueObjectType) {
    this.objectQueue = this.objectQueue.filter(
      (QueueObject: QueueObjectType) => QueueObject.key !== queueObject.key
    );

    await this.saveQueueToLocalStorage();
  }

  private async saveQueueToLocalStorage() {
    await AsyncStorage.setItem('Queue', JSON.stringify(this.objectQueue));
  }

  public executeQueue() {
    if (!this.isConnected || this.requestsFailed >= this.options.errorThreshold) return;
    for (let i = this.objectQueue.length - 1; i >= 0; i--) {
      const queueObject = this.objectQueue[i];

      switch (queueObject.action) {
        case QueueAction.SaveQuestion:
          saveQuestionByIdAndCode(queueObject.participantCode, queueObject.object as Question)
            .then(() => this.removeObjectFromQueue(queueObject))
            .catch(() => this.countError);
          break;

        case QueueAction.SaveQuestionnaire:
          saveQuestionnaireByCode(queueObject.participantCode, queueObject.object as Questionnaire)
            .then(() => this.removeObjectFromQueue(queueObject))
            .catch(() => this.countError);
          break;
      }
    }
  }

  private resetErrorCount() {
    if (this.requestsFailed > 0) {
      this.requestsFailed = 0;
    }
  }

  private countError() {
    this.requestsFailed++;
    if (this.requestsFailed >= this.options.errorThreshold) {
      setTimeout(this.resetErrorCount, this.options.resetTimeout);
    }
  }

  private unsubscribe = NetInfo.addEventListener((state) => {
    this.isConnected = state.isConnected ?? false;
  });
}

type QueueObjectType = {
  key: string;
  action: QueueAction;
  object: Object;
  participantCode: string;
};

export default TempStorage;
