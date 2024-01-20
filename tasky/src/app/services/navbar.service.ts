import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private temporizadorActualizado = new Subject<void>();

  get temporizadorActualizado$() {
    return this.temporizadorActualizado.asObservable();
  }

  actualizarTemporizador() {
    this.temporizadorActualizado.next();
  }
}
