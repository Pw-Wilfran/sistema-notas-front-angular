import { Routes } from '@angular/router';
import { Login } from './components/module-home/login/login';
import { Register } from './components/module-home/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { LayoutComponent } from './layout/layout.component/layout.component';
import { User } from './components/module-users/user/user';
import { Students } from './components/module-students/students/students';
import { NewUser } from './components/module-users/new-user/new-user';
import { EditUser } from './components/module-users/edit-user/edit-user';
import { Teachers } from './components/module-teacher/teachers/teachers';
import { Attendants } from './components/module-attendant/attendants/attendants';
import { NewStudent } from './components/module-students/new-student/new-student';
import { DetailsStudent } from './components/module-students/details-student/details-student';
import { EditStudent } from './components/module-students/edit-student/edit-student';
import { NewTeacher } from './components/module-teacher/new-teacher/new-teacher';
import { EditTeacher } from './components/module-teacher/edit-teacher/edit-teacher';







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
            { path: 'new-student', component: NewStudent },
            { path: 'edit-student', component: EditStudent },
            { path: 'detail-student', component: DetailsStudent },


            //DOCENTES
            { path: 'teachers', component: Teachers },
            { path: 'new-teacher', component: NewTeacher },
            { path: 'edit-teacher', component: EditTeacher },



            //ACUDIENTES
            { path: 'attendants', component: Attendants },

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },



];
