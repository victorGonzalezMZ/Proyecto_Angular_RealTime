import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ButtonsComponent } from './buttons/buttons.component';
import { CancelComponent } from './cancel/cancel.component';
import { CardsComponent } from './cards/cards.component';
import { ComponentsComponent } from './components.component';
import { PaisesComponent } from './paises/paises.component';
import { SearchComponent } from './search/search/search.component';

const routes: Routes = [
    { 
        path: '',
        component: ComponentsComponent,
        children: [
            { path: 'buttons', component: ButtonsComponent },
            { path: 'cards', component: CardsComponent },
            { path: 'search', component: SearchComponent },
            { path: 'cancel', component: CancelComponent },
            { path: 'paises', component: PaisesComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class  ComponentsRouterModule {}