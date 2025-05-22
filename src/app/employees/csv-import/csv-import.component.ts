import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-csv-import',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './csv-import.component.html'
})
export class CsvImportComponent {
  uploading = false;
  result = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, file.name);

    this.uploading = true;
    this.result = '';

    this.http.post<any>(`${environment.apiUrl}/import/csv`, formData)
      .subscribe({
        next: res => { this.result = `Imported ${res.imported} employees`; this.uploading = false; },
        error: err => { this.result = 'Import failed.'; this.uploading = false; }
      });
  }
}