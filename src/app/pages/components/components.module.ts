import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CancelComponent } from './cancel/cancel.component';
import { SearchComponent } from './search/search/search.component';
import { ComponentsRouterModule } from './components.routes';
import { PaisesComponent } from './paises/paises.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComponentsComponent, 
    ButtonsComponent, 
    CardsComponent, 
    CancelComponent, 
    SearchComponent, 
    PaisesComponent
  ],
  imports: [
    CommonModule,
    ComponentsRouterModule,
    NgSelectModule, 
    FormsModule
  ]
})
export class ComponentsModule { }
