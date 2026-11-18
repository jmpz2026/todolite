# 001 - CRUD de tareas

## Objetivo
Poder gestionar una lista de tareas mientras la app está en uso.

## Historias
- Como usuario, quiero agregar una tarea escribiendo su título.
- Como usuario, quiero ver todas mis tareas.
- Como usuario, quiero marcar una tarea como hecha.
- Como usuario, quiero borrar una tarea.

## Criterios de aceptación
- [x] Al escribir un título y pulsar "Agregar", la tarea aparece en la lista.
- [x] No se puede agregar una tarea con título vacío.
- [x] Al marcar el checkbox, la tarea se ve tachada.
- [x] Al pulsar "Borrar", la tarea desaparece.
- [x] Al recargar la página, las tareas siguen ahí (mientras el backend siga encendido).
- [x] Hay pruebas unitarias para crear, listar, completar, borrar y para el
      título vacío, y todas pasan.

## Fuera de alcance
- Editar el título, ordenar, filtrar.
- Guardar las tareas entre reinicios del backend (no hay base de datos).
