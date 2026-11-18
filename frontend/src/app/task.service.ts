import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export const API_URL = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/tasks`;

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  create(title: string): Observable<Task> {
    return this.http.post<Task>(this.url, { title });
  }

  setDone(id: number, done: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${id}`, { done });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
