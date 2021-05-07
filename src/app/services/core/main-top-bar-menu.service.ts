import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const endPoit: string = 'assets/json/mainMenu.json';

@Injectable({
  providedIn: 'root'
})
export class MainTopBarMenuService {

  constructor(private http: HttpClient) { }

  getItemsMenu() {
    return this.http.get(endPoit);
  }
}
