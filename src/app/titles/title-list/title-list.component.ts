import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Title } from '../title.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './title-list.component.html'
})
export class TitleListComponent implements OnInit {
  titles: Title[] = [];
  constructor(private titleService: TitleService, private router: Router) {}

  ngOnInit() {
    this.load();
  }
  load() {
    this.titleService.getAll().subscribe(titles => this.titles = titles);
  }
  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.titleService.delete(id).subscribe(() => this.load());
    }
  }
}