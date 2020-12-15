import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {
        path: '', component: UsersComponent,
        children:[{ path: '', component: SignUpComponent}]
    },
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    // {
    //     path: '/logout', component: LogoutComponent
    // },
    // {
    //     path: '/home', component: HomeComponent
    // }
];