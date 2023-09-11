import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

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
  @Output() primaryButtonClick = new EventEmitter<void>();
  @Output() secondaryButtonClick = new EventEmitter<void>();

  constructor(private elRef: ElementRef) {}
  @HostListener('document:click', ['$event'])

  clickToOutside(event: Event) {
    console.log('rgr')
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
