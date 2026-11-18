import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/api';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly apiStatus = signal('...');

  ngOnInit(): void {
    this.http.get<{ status: string }>(`${API_URL}/health`).subscribe({
      next: (res) => this.apiStatus.set(res.status),
      error: () => this.apiStatus.set('sin conexión'),
    });
  }
}
