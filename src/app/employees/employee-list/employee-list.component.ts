import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TitleService } from '../../titles/title.service';
import { DepartmentService } from '../../departments/department.service';
import { Title } from '../../titles/title.model';
import { Department } from '../../departments/department.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  titles: Title[] = [];
  departments: Department[] = [];
  searchTerm: string = '';

  constructor(
    private empService: EmployeeService,
    private titleService: TitleService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.titleService.getAll().subscribe(data => this.titles = data);
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  loadEmployees() {
    this.empService.getAll().subscribe(data => this.employees = data);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.empService.search(this.searchTerm).subscribe(data => this.employees = data);
    } else {
      this.loadEmployees();
    }
  }

  deleteEmployee(id: string) {
    this.empService.softDelete(id).subscribe(() => this.loadEmployees());
  }

  getTitleName(id: string): string {
    const title = this.titles?.find(t => t.id === id);
    return title ? title.name : id;
  }

  getDepartmentName(id: string): string {
    const dept = this.departments?.find(d => d.id === id);
    return dept ? dept.name : id;
  }
}