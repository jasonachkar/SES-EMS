import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the import based on your environment setup

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  workPhone?: string;
  workEmail: string;
  personalPhone?: string;
  personalEmail?: string;
  hoursPerWeek: number;
  employmentType: string;
  titleIds: string[];
  departmentIds: string[];
  isDeleted?: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`; // Use correct backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, emp);
  }

  update(id: string, emp: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, emp);
  }

  softDelete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/search?name=${name}`);
  }

  filter(departmentId?: string, titleId?: string): Observable<Employee[]> {
    let url = `${this.apiUrl}/filter?`;
    if (departmentId) url += `departmentId=${departmentId}&`;
    if (titleId) url += `titleId=${titleId}`;
    return this.http.get<Employee[]>(url);
  }
}