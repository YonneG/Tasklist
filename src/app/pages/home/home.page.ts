import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Modal } from '../home/modal/modal.page';
import { toDoItem } from 'src/app/interfaces/to-do-item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  taskName: string = '';
  list: toDoItem [] = [];
  removeTask: boolean = false;
  private modalWindowOpen: boolean = false;
  
  constructor(
    private modalController: ModalController,
    private dataService: DataService
    ) {
    this.loadData();
    this.dataService.showData();
  }

  async openModal(index: number) {
    if (!this.modalWindowOpen) {
        this.modalWindowOpen = true;
        const modal = await this.modalController.create({
        component: Modal,
        cssClass: 'modal',
        componentProps: {
          taskName: this.list[index]
        }
      });

      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.list[index].name = data.data.name;
          this.list[index].note = data.data.note;
          this.list[index].checked = data.data.checked;
          this.saveData();
        }
        this.modalWindowOpen = false;
      });
      
      return await modal.present();
    }
  }
  
  async loadData() {
    try {
      this.list = await this.dataService.getData()
    } catch (error) {
      this.list = [];
      console.log('load data error: ', error)
    } finally {
      if (!this.list) {
        this.list = [];
      } else if (this.list.length == 0) {
        this.removeTask = true;
      }
    }
  }
  
  addList() {
    if (this.taskName.length > 0) {
      let name = this.taskName;
      this.list.push({name:name, checked:false});
      this.taskName = '';
      this.saveData();
    }
    if (this.list.length > 0) {
      this.removeTask = false;
    }
  }

  async saveData() {
    try {
      await this.dataService.saveData(this.list);
    } catch (error) {
      console.log('save data error: ', error);
    } finally {
      this.taskName = '';
    }
  }
  
  toggleRemove() {
    if (this.list.length != 0) {
      this.removeTask = !this.removeTask;
    }
  }
  
  removeList(index:number) {
    this.list.splice(index, 1);
    this.removeData(index);
    if (this.list.length == 0) {
      this.removeTask = true;
    }
  }
  
  async removeData(index:number) {
    await this.dataService.removeItem(index);
  }
  
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
    [this.list[ev.detail.from], this.list[ev.detail.to]] = [this.list[ev.detail.to], this.list[ev.detail.from]];
    this.saveData();
  }

  keyEvent(event:any) {
    if (event == 13) {
      this.addList();
    }
  }
}
