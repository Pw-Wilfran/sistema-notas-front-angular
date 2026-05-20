import { Routes } from '@angular/router';
import { Login } from './components/module-home/login/login';
import { Register } from './components/module-home/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { LayoutComponent } from './layout/layout.component/layout.component';
import { User } from './components/module-users/user/user';
import { Students } from './components/module-students/students/students';
import { NewUser } from './components/module-users/new-user/new-user';
import { EditUser } from './components/module-users/edit-user/edit-user';







export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'register', component: Register },


     // SISTEMA PRIVADO
    {
        path: '',
        component: LayoutComponent,

        children: [

            // DASHBOARD
            { path: 'dashboard', component: Dashboard },



            // USUARIOS
            { path: 'user', component: User },
            { path: 'new-user', component: NewUser },
            { path: 'edit-user/:id', component: EditUser },




            // ESTUDIANTES
            { path: 'students', component: Students },


            //DOCENTES

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },



];
