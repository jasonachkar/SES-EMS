import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../../titles/title.service';
import { DepartmentService } from '../../departments/department.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    firstName: '',
  lastName: '',
  middleName: '',
  workPhone: '',
  workEmail: '',
  personalPhone: '',
  personalEmail: '',
  hoursPerWeek: 40,
  employmentType: 'FullTime',
  titleIds: [],
  departmentIds: [],
  isDeleted: false
  };
  isEdit: boolean = false;
  titles: { id?: string, name: string }[] = [];
  departments: { id?: string, name: string }[] = [];

  constructor(
    private empService: EmployeeService,
    private titleService: TitleService,
    private deptService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch titles
    this.titleService.getAll().subscribe(titles => this.titles = titles);

    // Fetch departments
    this.deptService.getAll().subscribe(depts => this.departments = depts);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.empService.getById(id).subscribe(emp => this.employee = emp);
    }
  }

  save() {
    const payload = { ...this.employee };
  delete payload.id; // Ensure id is not sent on create

  if (this.isEdit && this.employee.id) {
    this.empService.update(this.employee.id, payload)
      .subscribe(() => this.router.navigate(['/employees']));
  } else {
    this.empService.create(payload)
      .subscribe(() => this.router.navigate(['/employees']));
  }
}
}