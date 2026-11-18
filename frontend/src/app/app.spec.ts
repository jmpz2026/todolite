import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { TaskService } from './task.service';

describe('App', () => {
  const api = 'http://localhost:3000/api';
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(`${api}/health`).flush({ status: 'ok' });
    httpMock.expectOne(`${api}/tasks`).flush([{ id: 1, title: 'Comprar pan', done: false }]);
    await fixture.whenStable();
    return fixture;
  }

  it('muestra el texto "TodoLite"', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TodoLite');
  });

  it('muestra "API: ok" cuando /api/health responde', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('API: ok');
  });

  it('lista las tareas que devuelve el backend', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li')?.textContent).toContain('Comprar pan');
  });

  it('con el input vacío, Agregar no llama al servicio', async () => {
    const fixture = await render();
    const service = TestBed.inject(TaskService);
    const createSpy = vi.spyOn(service, 'create');
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input') as HTMLInputElement;
    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    (compiled.querySelector('button[type=submit]') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('al agregar un título, la tarea aparece en la lista', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input') as HTMLInputElement;
    input.value = 'Lavar ropa';
    input.dispatchEvent(new Event('input'));
    (compiled.querySelector('button[type=submit]') as HTMLButtonElement).click();

    const req = httpMock.expectOne(`${api}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, title: 'Lavar ropa', done: false });
    await fixture.whenStable();

    expect(compiled.querySelectorAll('li').length).toBe(2);
    expect(compiled.textContent).toContain('Lavar ropa');
  });

  it('al marcar el checkbox, la tarea se ve tachada', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;

    const checkbox = compiled.querySelector('li input[type=checkbox]') as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    const req = httpMock.expectOne(`${api}/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ done: true });
    req.flush({ id: 1, title: 'Comprar pan', done: true });
    await fixture.whenStable();

    expect(compiled.querySelector('li label')?.classList).toContain('done');
  });

  it('al pulsar "Borrar", la tarea desaparece', async () => {
    const fixture = await render();
    const compiled = fixture.nativeElement as HTMLElement;

    (compiled.querySelector('li button') as HTMLButtonElement).click();

    const req = httpMock.expectOne(`${api}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
    await fixture.whenStable();

    expect(compiled.textContent).not.toContain('Comprar pan');
  });
});
