import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  loading = false;

  constructor(private deptService: DepartmentService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.deptService.getAll().subscribe({
      next: data => { this.departments = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.deptService.delete(id).subscribe(() => this.load());
    }
  }
}