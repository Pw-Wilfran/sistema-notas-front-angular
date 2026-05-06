import { Routes } from '@angular/router';
import { Login } from './components/module-home/login/login';
import { Register } from './components/module-home/register/register';
import { Dashboard } from './components/dashboard/dashboard';







export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
];

