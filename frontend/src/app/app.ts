import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, Task, TaskService } from './task.service';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly taskService = inject(TaskService);

  protected readonly apiStatus = signal('...');
  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTitle = signal('');

  ngOnInit(): void {
    this.http.get<{ status: string }>(`${API_URL}/health`).subscribe({
      next: (res) => this.apiStatus.set(res.status),
      error: () => this.apiStatus.set('sin conexión'),
    });

    this.taskService.list().subscribe((tasks) => this.tasks.set(tasks));
  }

  protected add(): void {
    const title = this.newTitle().trim();
    if (!title) return;

    this.taskService.create(title).subscribe((task) => {
      this.tasks.update((tasks) => [...tasks, task]);
      this.newTitle.set('');
    });
  }

  protected toggle(task: Task, done: boolean): void {
    this.taskService.setDone(task.id, done).subscribe((updated) => {
      this.tasks.update((tasks) => tasks.map((t) => (t.id === updated.id ? updated : t)));
    });
  }

  protected remove(task: Task): void {
    this.taskService.remove(task.id).subscribe(() => {
      this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
    });
  }
}
