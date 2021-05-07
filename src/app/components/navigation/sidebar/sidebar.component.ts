import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() titleMenu: string = "";
  @Input() mainIconMenu: string = "fa-laugh-wink";
  @Input() subtitleMenu: string = "";
  @Input() sidebar_menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
