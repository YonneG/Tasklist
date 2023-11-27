import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modal } from './modal.page';

const routes: Routes = [
  {
    path: '',
    component: Modal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPageRoutingModule {}
