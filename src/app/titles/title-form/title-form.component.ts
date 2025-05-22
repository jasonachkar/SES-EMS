import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Title } from '../title.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-title-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './title-form.component.html'
})
export class TitleFormComponent implements OnInit {
  title: Title = { name: '', description: '' };
  isEdit = false;

  constructor(private titleService: TitleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.titleService.getById(id).subscribe(t => this.title = t);
    }
  }
  save() {
    if (this.isEdit && this.title.id) {
      this.titleService.update(this.title.id, this.title).subscribe(() => this.router.navigate(['/titles']));
    } else {
      this.titleService.create(this.title).subscribe(() => this.router.navigate(['/titles']));
    }
  }
}