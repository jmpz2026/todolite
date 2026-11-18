# Plan 001

## Datos (backend/store.js)
- Arreglo en memoria: tasks = [] y un contador nextId = 1.
- Cada tarea: { id: number, title: string, done: boolean }.
- Funciones: list(), create(title), setDone(id, done), remove(id), reset().
- reset() vacía el arreglo; se usa solo en las pruebas.

## API (backend/app.js)
- GET /api/tasks → lista todas
- POST /api/tasks { title } → 400 si está vacío
- PATCH /api/tasks/:id { done } → 404 si no existe
- DELETE /api/tasks/:id → 404 si no existe

## Frontend
- task.service.ts con los 4 métodos HTTP.
- AppComponent: input + botón Agregar, lista con checkbox y botón Borrar.

## Pruebas
- Backend, store (test/store.test.js): cada función de store.js, con reset()
  antes de cada prueba.
- Backend, API (test/tasks.test.js, supertest):
  - POST crea una tarea; POST con título vacío → 400
  - GET devuelve las tareas creadas
  - PATCH cambia done; DELETE la elimina; id inexistente → 404
- Frontend:
  - task.service.spec.ts: cada método usa la URL y el verbo correctos
  - app.spec.ts: con el input vacío, Agregar no llama al servicio
