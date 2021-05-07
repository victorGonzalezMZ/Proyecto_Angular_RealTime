import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ChatboxComponent } from '../../components/chatbox/chatbox.component';
import { MainTopBarMenuService } from '../../services/core/main-top-bar-menu.service';
import { SidebarService } from '../../services/core/sidebar.service';
import { Router } from '@angular/router';

declare var App: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'App Real-Time';
  miEmpresa: string = 'Víctor Emmanuel González Martínez';
  periodo: number = 2021;

  menuItems: any[] = [];

  sidebarItems: any[] = [];

  constructor(public socket: SocketioService, private menuSvc: MainTopBarMenuService, private sidebarSvc: SidebarService, private router: Router) { }

  ngOnInit(): void {
    var tokenAuth = window.sessionStorage.getItem('token');

    if(tokenAuth == null){
      this.router.navigate(['/login']);
    }else{
      this.getData();
    }
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
