import { Component, OnInit } from '@angular/core';
import { eventNames } from 'process';
import { MainTopBarMenuService } from './services/core/main-top-bar-menu.service';
import { SidebarService } from './services/core/sidebar.service';
import { ChatboxComponent } from './components/chatbox/chatbox.component';

declare var App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private menuSvc: MainTopBarMenuService, private sidebarSvc: SidebarService){}

  title = 'App Real-Time';
  miEmpresa: string = 'Víctor Emmanuel González Martínez';
  periodo: number = 2021;

  menuItems: any[] = [];

  sidebarItems: any[] = [];

  ngOnInit(){
    App.init()
  }

  getData() {
    this.menuSvc.getItemsMenu().subscribe((data: any) =>  {
      this.menuItems = data;
    });

    this.sidebarSvc.getItemsSideBar().subscribe((data: any) => {
      this.sidebarItems = data;
    });
  }

  listenChildMenuEvent(eventArgs: any) {
    console.log('Los datos emitidos por el componete so: ',  eventArgs);
    console.log('el indice seleccioado es: ', eventArgs.index);
    console.log('El item seleccionado es:', eventArgs.item);
  }

}
