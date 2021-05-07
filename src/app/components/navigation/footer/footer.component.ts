import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'navigation-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  @Input() empresa: string;
  @Input() anio: number;
  @Input() isBold: boolean = true;

  ngOnInit(): void {
  }

}
