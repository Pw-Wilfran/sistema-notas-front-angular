// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
   private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  private isMobile = new BehaviorSubject<boolean>(window.innerWidth < 1024);
  isMobile$ = this.isMobile.asObservable();

  constructor() {
    fromEvent(window, 'resize').subscribe(() => {
      this.isMobile.next(window.innerWidth < 1024);
    });

    // Desktop abierto por defecto
    if (window.innerWidth >= 1024) {
      this.isOpen.next(true);
    }
  }

  toggle() {
    this.isOpen.next(!this.isOpen.value);
  }

  close() {
    if (this.isMobile.value) {
      this.isOpen.next(false);
    }
  }

  open() {
    this.isOpen.next(true);
  }

  get mobile(): boolean {
    return this.isMobile.value;
  }

  get opened(): boolean {
    return this.isOpen.value;
  }
}