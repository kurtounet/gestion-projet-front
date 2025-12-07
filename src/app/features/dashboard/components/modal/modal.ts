import { Component, EventEmitter, inject, input, Type } from '@angular/core';

import { NgComponentOutlet } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { FormFactoryService } from '../../services/form-factory.service';

@Component({
  selector: 'app-modal',
  imports: [NgComponentOutlet],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  modalService = inject(ModalService);
  formFactory = inject(FormFactoryService);
  formNames: string[] = [];

  get selectedForm(): Type<any> | null {
    const typeItem = this.modalService.typeItem();
    if (!typeItem) {
      return null;
    }
    return this.formFactory.getForm(typeItem);
  }

  close() {
    this.modalService.close();
  }

  onFormChange(event: string) {
    const formName = event.toLowerCase();
    const form = this.formFactory.getForm(formName);
    return form;
  }
}
