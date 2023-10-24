import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() primaryButtonLabel!: string;
  @Input() secondaryButtonLabel!: string;
  @Input() modalType!: string;
  @Output() primaryButtonClick = new EventEmitter<void>();
  @Output() secondaryButtonClick = new EventEmitter<void>();

  constructor(
              private elRef: ElementRef,
              private modalService: ModalService) {}
  @HostListener('document:click', ['$event'])

  clickToOutside(event: Event) {
    this.modalService.showErrorModal = false;
    this.modalService.showSuccessModal = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
