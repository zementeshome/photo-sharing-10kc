import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UsersComponent,
        children:[{ path: '', component: SignUpComponent}]
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];