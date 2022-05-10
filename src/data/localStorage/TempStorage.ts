import AsyncStorage from '@react-native-async-storage/async-storage';
import { Queue } from 'queue-typescript';

/*
*   Limits: 6 MB by default.
*   Reading size max is 2 MB.
*   docs: https://react-native-async-storage.github.io/async-storage/docs/limits
*/

class TempStorage {
  private readonly objectQueue: Queue<object>;

  constructor() {
    this.objectQueue = new Queue();
  }

  // TODO remove or make private
  async clear() {
    await AsyncStorage.clear();
  }

  printQueue() {
    console.log();
    console.log('-------------------------------');
    for (let obj of this.objectQueue) {
      console.log(`${obj.type} ${obj.key}`);
    }
    console.log('-------------------------------');
    console.log();
  }

  /*
  * Save data for later sync with api
  * Temp added to local storage
  *   TODO remove option for saving string?
  *   TODO add target (api route) to send to specific api endpoint?
  */
  async saveData(key: string, value: any) {
    if (typeof value === 'object') {
      await this.storeModel(value, key);
      this.objectQueue.enqueue({
        'type': 'object',
        'key': key,
      });
    } else if (typeof value === 'string') {
      await this.storeString(value, key);
      this.objectQueue.enqueue({
        'type': 'string',
        'key': key,
      });
    }
  }

  async sendToAPI() {
    throw new Error('Not implemented');

    while (this.objectQueue.length > 0) {
      const item = this.objectQueue.dequeue();

    }
  }

  private async storeModel(value: object, key: string) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        key,
        jsonValue,
      );
    } catch (error) {
      // Error saving data
      throw new Error('Error saving model');
    }
  }

  private async storeString(value: string, key: string) {
    try {
      await AsyncStorage.setItem(
        key,
        value,
      );
    } catch (error) {
      // Error saving data
      throw new Error('Error saving string');
    }
  }

  async getModel(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      throw new Error('Error getting model');
    }
  }

  async getString(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? value : null;
    } catch (e) {
      // error reading value
      throw new Error('Error getting string');
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      for (let obj of this.objectQueue) {
        if (obj.key == key) {
          this.objectQueue.remove(obj);
        }
      }
    } catch (e) {
      // error deleting value
      throw new Error('Error removing data');
    }
  }

}

const storage = new TempStorage();
export default storage;