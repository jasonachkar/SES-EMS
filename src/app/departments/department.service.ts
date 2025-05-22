import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the import based on your environment setup

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/departments`; // Use correct backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
  getById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }
  create(dept: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, dept);
  }
  update(id: string, dept: Department): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dept);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}