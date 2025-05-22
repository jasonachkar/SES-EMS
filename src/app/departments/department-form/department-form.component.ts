import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.scss'
})
export class DepartmentFormComponent implements OnInit {
  department: Department = {name: '', description: '' };
  isEdit = false;

  constructor(
    private deptService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.deptService.getById(id).subscribe(d => this.department = d);
    }
  }

  save() {
    if (this.isEdit && this.department.id) {
      this.deptService.update(this.department.id, this.department)
        .subscribe(() => this.router.navigate(['/departments']));
    } else {
      this.deptService.create(this.department)
        .subscribe(() => this.router.navigate(['/departments']));
    }
  }
}