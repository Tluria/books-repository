import { Injectable } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToasterService {

  constructor( public toastr: ToastsManager) {}

  showSuccess() {
    this.toastr.success('Book Added', '');
  }

  showError() {
    this.toastr.error('Book already exists in the system, try another title!!', '');
  }

  showWarning() {
    this.toastr.warning('All fields are required!!', '');
  }

  showInfo() {
    this.toastr.info('Book Updated.');
  }
}
