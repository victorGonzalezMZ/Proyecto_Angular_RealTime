import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const END_POINT = 'https://restcountries.eu/rest/v2';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  getAllPaises() {
    return this.http.get(`${END_POINT}/all`);
  }

  getPaisesByRegion(region: string) {

    return this.http.get(`${END_POINT}/region/${region}`);
  
  }

  getPaisByCriterio(criterio:string) {
    return this.http.get(`${END_POINT}/name/${criterio}`);
  }

}
