import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  private resourceCreatedSource = new Subject<void>();
  resourceCreated$ = this.resourceCreatedSource.asObservable();

  notifyResourceCreated(): void {
    this.resourceCreatedSource.next();
  }
}
