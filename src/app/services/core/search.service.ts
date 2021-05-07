import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private subject$ = new Subject<string>();

  constructor() { }

  /*
   * Método para publicación del Observable
   */
  sendCriterio(criterio: string) {
    this.subject$.next(criterio);
  }

  /*
   * Método para subscribirnos al Observable 
  */
  onListenCriterio(): Observable<string> {
    return this.subject$.asObservable();
  }

}
