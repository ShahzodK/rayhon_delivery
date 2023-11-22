import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  public showErrorModal = false;
  public showSuccessModal = false;
}
