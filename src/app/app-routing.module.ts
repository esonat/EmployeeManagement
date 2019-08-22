import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeesComponent } from './employee/list-employees/list-employees.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { MatListAvatarCssMatStyler } from '@angular/material/list';


const routes: Routes = [
  {path:'add-employee',component:AddEmployeeComponent},
  {path:'list-employee',component:ListEmployeesComponent},
  {path:'edit-employee/:id',component:EditEmployeeComponent},
  {path:'',redirectTo:'/list-employee',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
