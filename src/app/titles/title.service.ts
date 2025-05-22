import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from './title.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the import based on your environment setup

@Injectable({ providedIn: 'root' })
export class TitleService {
  private apiUrl = `${environment.apiUrl}/titles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Title[]> {
    return this.http.get<Title[]>(this.apiUrl);
  }
  getById(id: string): Observable<Title> {
    return this.http.get<Title>(`${this.apiUrl}/${id}`);
  }
  create(title: Title): Observable<Title> {
    return this.http.post<Title>(this.apiUrl, title);
  }
  update(id: string, title: Title): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, title);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}