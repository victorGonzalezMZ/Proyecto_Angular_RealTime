import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path: 'dashboard', loadChildren: () => import('./pages/tableros/tableros.module').then(module => module.TablerosModule) },
    { path: 'components', loadChildren: () => import('./pages/components/components.module').then(module => {
        return module.ComponentsModule;
    }) },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRouterModule { }
