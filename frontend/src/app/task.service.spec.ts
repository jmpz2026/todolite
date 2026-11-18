import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  const url = 'http://localhost:3000/api/tasks';
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('list() hace GET a /api/tasks', () => {
    service.list().subscribe((tasks) => expect(tasks.length).toBe(1));

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, title: 'Una', done: false }]);
  });

  it('create() hace POST a /api/tasks con el título', () => {
    service.create('Comprar pan').subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'Comprar pan' });
    req.flush({ id: 1, title: 'Comprar pan', done: false });
  });

  it('setDone() hace PATCH a /api/tasks/:id con done', () => {
    service.setDone(3, true).subscribe();

    const req = httpMock.expectOne(`${url}/3`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ done: true });
    req.flush({ id: 3, title: 'x', done: true });
  });

  it('remove() hace DELETE a /api/tasks/:id', () => {
    service.remove(3).subscribe();

    const req = httpMock.expectOne(`${url}/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
