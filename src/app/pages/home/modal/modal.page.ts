import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { toDoItem } from 'src/app/interfaces/to-do-item.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class Modal {

  @Input() taskName?: toDoItem;
  name: any;
  note: any;
  checked: boolean = false;

  formData: FormGroup;

  constructor(
    private modalController: ModalController) {

    this.formData = new FormGroup({
      name: new FormControl(),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.name = this.taskName?.name;
    this.note = this.taskName?.note;
    if (this.taskName?.checked) {
      this.checked = this.taskName?.checked;
    }
  }

  acceptModal() {
    if (this.formData.value.name && this.formData.value.note) {
      this.modalController.dismiss({name: this.formData.value.name, note: this.formData.value.note, checked: this.checked});
    } else if (this.formData.value.name) {
      this.modalController.dismiss({name: this.formData.value.name, note: this.note, checked: this.checked});
    } else if (!this.formData.value.name && this.formData.value.note) {
      this.modalController.dismiss({name: this.name, note: this.formData.value.note, checked: this.checked});
    } else {
      this.modalController.dismiss({name: this.name, note: this.note, checked: this.checked});
    }
  }

  dismissModal() {
    this.modalController.dismiss({name: this.name, note: this.note});
  }

  keyEvent(event:any) {
    if (event == 13) {
      this.acceptModal();
    }
  }
}
