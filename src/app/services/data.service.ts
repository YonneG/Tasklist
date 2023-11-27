import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'toDoLists';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  getData() {
    return this.storage.get(STORAGE_KEY) || [];
  }

  async showData() {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    console.log(storedData);
  }

  async saveData(item: any) {
    // const storedData = await this.storage.get(STORAGE_KEY) || [];
    // storedData.push(item);
    // return this.storage.set(STORAGE_KEY, storedData);
    return this.storage.set(STORAGE_KEY, item);
  }

  async removeItem(index: any) {
    const StoredData = await this.storage.get(STORAGE_KEY) || [];
    StoredData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, StoredData);
  }
}
