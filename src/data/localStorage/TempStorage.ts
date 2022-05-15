import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 *   Limits: 6 MB by default.
 *   Reading size max is 2 MB.
 *   docs: https://react-native-async-storage.github.io/async-storage/docs/limits
 */

class TempStorage {
  private static instance: TempStorage;
  private objectQueue: QueueType[] = [];
  private checkedLocalStorageForQueue: boolean = false;

  private constructor() {}

  public static getInstance(): TempStorage {
    if (!TempStorage.instance) {
      TempStorage.instance = new TempStorage();
    }
    return TempStorage.instance;
  }

  private async saveQueue() {
    try {
      const jsonValue = JSON.stringify(this.objectQueue);
      await AsyncStorage.setItem('objectQueue', jsonValue);
    } catch (error) {
      // Error saving data
      console.log('TempStorage.SaveQueue error');
      console.log(error);
      throw new Error('Error saving queue');
    }
  }

  viewQueue() {
    console.log(JSON.stringify(this.objectQueue, null, 2));
  }

  async clear() {
    this.objectQueue = [];
    await AsyncStorage.clear();
    this.viewQueue();
    console.log('Local storage cleared');
  }

  private async RetrieveExistingObjectQueue() {
    if (this.objectQueue.length === 0 && !this.checkedLocalStorageForQueue) {
      this.checkedLocalStorageForQueue = true;
      try {
        const jsonValue = await AsyncStorage.getItem('objectQueue');
        this.objectQueue = jsonValue !== null ? JSON.parse(jsonValue) : [];
        this.viewQueue();
      } catch (e) {
        // error reading value
        console.log('TempStorage.retrieveQueue error');
        throw new Error('Error getting model');
      }
    }
  }

  /*
   * Save data for later sync with api
   * Temp added to local storage
   *
   *   TODO add target (api route) to send to specific api endpoint?
   */
  async saveData(key: string, value: object) {
    await this.RetrieveExistingObjectQueue();

    let obj: QueueType = {
      type: 'object',
      datetime: new Date(),
      key: key,
    };

    await this.storeModel(value, key).then(() => {
      this.addToQueue(obj);
    });

    await this.saveQueue();
  }

  private addToQueue(object: QueueType) {
    for (let i = 0; i < this.objectQueue.length; i++) {
      if (this.objectQueue[i].key === object.key) {
        this.objectQueue[i] = object;
        console.log('replaced item in queue');
        return;
      }
    }
    console.log('Did not find copy. Adding to queue');
    this.objectQueue.push(object);
  }

  /*
  Returns null if no data found
  TODO add date check based on API response
   */
  public async tryGetModelFromLocalStorage(key: string): Promise<object | undefined> {
    if (!key) return undefined;
    await this.RetrieveExistingObjectQueue();

    for (let value of this.objectQueue) {
      if (value.key === key) {
        return this.getModel(key);
      }
    }
    return undefined;
  }

  /*
   *** Loop through queue and upload to API. ***
   *** TODO implement this function
   */
  async sendToAPI() {
    await this.RetrieveExistingObjectQueue(); // probably runs first

    // check if anything to upload.
    // while (this.objectQueue.length > 0) {
    //   const obj = this.objectQueue.dequeue();
    //   // upload to api
    //   // remove from local storage
    // }
    // clear queue
  }

  private async storeModel(value: object, key: string) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      // Error saving data
      console.log('TempStorage.storeModel error');
      console.log(error);
      throw new Error('Error saving model');
    }
  }

  async storeString(value: string, key: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      throw new Error('Error saving string');
    }
  }

  private async getModel(key: string): Promise<object> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      throw new Error('Error getting model');
    }
  }

  private async getString(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? value : null;
    } catch (e) {
      // error reading value
      throw new Error('Error getting string');
    }
  }

  private async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      for (let obj of this.objectQueue) {
        if (obj.key === key) {
          this.objectQueue.splice(this.objectQueue.indexOf(obj));

          await this.saveQueue();
        }
      }
    } catch (e) {
      // error deleting value
      throw new Error('Error removing data');
    }
  }
}

type QueueType = {
  type: string;
  datetime: Date;
  key: string;
};

export default TempStorage;
