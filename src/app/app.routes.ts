import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { TitleListComponent } from './titles/title-list/title-list.component';
import { TitleFormComponent } from './titles/title-form/title-form.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { DepartmentFormComponent } from './departments/department-form/department-form.component';
import { CsvImportComponent } from './employees/csv-import/csv-import.component';  


export const routes: Routes = [
  { path: '', component: EmployeeListComponent, pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  {path: 'employees/:id', component: EmployeeDetailsComponent},
  { path: 'employees/:id/edit', component: EmployeeFormComponent },
  { path: 'titles', component: TitleListComponent },
  { path: 'titles/new', component: TitleFormComponent },
  { path: 'titles/:id/edit', component: TitleFormComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentFormComponent },
  { path: 'departments/:id/edit', component: DepartmentFormComponent },
  {path: 'csv-import', component: CsvImportComponent},
];