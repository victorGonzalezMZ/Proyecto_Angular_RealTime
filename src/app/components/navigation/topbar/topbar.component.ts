import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from 'src/app/services/core/search.service';
import { SocketioService } from '../../../services/socketio.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() menuProfileItems: any[] = [];
  @Output() onClickMenu: EventEmitter<any> = new EventEmitter();
  @ViewChild('userView', { static: true }) userView: ElementRef;

  title = 'Api Real-Time';
  userName = window.sessionStorage.getItem('fullName');
  email = window.sessionStorage.getItem('email');
  photoUrl = window.sessionStorage.getItem('photo');

  suscription$: Subscription;

  constructor(private searchSvc: SearchService, public socket: SocketioService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onclick_menu(index: number, item: any) {
    this.onClickMenu.emit({
      index,
      name: item.title
    });
  }

  onclick_search(criterio: string) {
    this.searchSvc.sendCriterio(criterio);
  }

  logout(){
    window.sessionStorage.clear();

    this.socket.emit('logout', {});

    this.router.navigate(['/login']);
  }

}
