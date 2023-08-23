import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mode } from './mode-toggle.model';

@Injectable({
  providedIn: 'root'
})
export class ModeToggleService {
  private currentMode: Mode = Mode.LIGHT;

  public modeChangedSubject = new BehaviorSubject(this.currentMode);

  public modeChanged$: Observable<Mode>;

  public LOCAL_STORAGE_KEY = "mode";

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.modeChanged$ = this.modeChangedSubject.asObservable();
    this.init();
  }
   
  private updateCurrentMode(mode: Mode) {
    this.currentMode = mode;
    this.modeChangedSubject.next(this.currentMode);
    this.save(this.currentMode);
  }

  private init() {
    const deviceMode = window.matchMedia("(prefers-color-scheme: dark)");
    let initMode = this.get();
    if (!initMode) {
      deviceMode.matches ? (initMode = Mode.DARK) : (initMode = Mode.LIGHT);
    }
    this.updateCurrentMode(initMode);
    this.document.body.classList.add(this.currentMode);
  }

  public toggleMode() {
    this.document.body.classList.toggle(Mode.LIGHT);
    this.document.body.classList.toggle(Mode.DARK);
    if (this.currentMode === Mode.LIGHT) {
      this.updateCurrentMode(Mode.DARK);
    } else {
      this.updateCurrentMode(Mode.LIGHT);
    }
  }


  public save(mode: Mode): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, mode.toString());
  }
  public get(): Mode {
    return <Mode>localStorage.getItem(this.LOCAL_STORAGE_KEY) || undefined;
  }
}
