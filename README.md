# Patrones de diseño

Colección educativa de implementaciones en TypeScript de patrones de diseño (creacionales, estructurales y de comportamiento). El proyecto está pensado para ejecutarse con Deno (recomendado) o Bun. También es posible usar Node.js compilando TypeScript primero.

## Estructura del repositorio

- 01-creacionales/: ejemplos de patrones creacionales (Builder, Factory Method, Abstract Factory, Prototype, Singleton, Inmutabilidad, Factory Function).
- helpers/: utilidades compartidas (colores y sleep).
- deno.json: configuración de import map / tareas (Deno).

## Cómo ejecutar

Usando Deno (recomendado):
- Ejecutar un archivo de ejemplo:
  deno run --allow-read 01-creacionales/01-builder.ts

Usando Bun:
- Ejecutar un archivo de ejemplo:
  bun run 01-creacionales/01-builder.ts

Usando Node.js:
1. Inicializar y compilar TypeScript (configurar tsconfig.json).
2. tsc
3. node dist/01-creacionales/01-builder.js

Notas: Muchos ejemplos usan `prompt()` y `console` para interacción simple.

## Patrones incluidos (con enlaces a archivos y símbolos clave)

- Builder
  - Archivo: [01-creacionales/01-builder.ts](01-creacionales/01-builder.ts)
  - Clases: [`Computer`](01-creacionales/01-builder.ts), [`ComputerBuilder`](01-creacionales/01-builder.ts), [`QueryBuilder`](01-creacionales/01.2-builder.ts)

- Factory Method
  - Archivo: [01-creacionales/02-factory-method.ts](01-creacionales/02-factory-method.ts)
  - Clases: [`Restaurant`](01-creacionales/02-factory-method.ts), [`ChickenRestaurant`](01-creacionales/02-factory-method.ts)

- Factory Method (ejemplo con factories)
  - Archivo: [01-creacionales/02.2-factory-method.ts](01-creacionales/02.2-factory-method.ts)
  - Clases: [`Report`](01-creacionales/02.2-factory-method.ts), [`ReportFactory`](01-creacionales/02.2-factory-method.ts), [`SalesReportFactory`](01-creacionales/02.2-factory-method.ts)

- Abstract Factory
  - Archivo: [01-creacionales/03-abstract-factory.ts](01-creacionales/03-abstract-factory.ts)
  - Símbolos: [`RestaurantFactory`](01-creacionales/03-abstract-factory.ts), [`FastFoodRestaurantFactory`](01-creacionales/03-abstract-factory.ts)
  - Archivo alternativo: [01-creacionales/03.2-abstract-factory.ts](01-creacionales/03.2-abstract-factory.ts)

- Prototype
  - Archivos: [01-creacionales/04-prototype.ts](01-creacionales/04-prototype.ts) (`Document`), [01-creacionales/04.2-prototype.ts](01-creacionales/04.2-prototype.ts) (`Pokemon`)

- Inmutabilidad (copyWith)
  - Archivos: [01-creacionales/05-inmutabilidad.ts](01-creacionales/05-inmutabilidad.ts) (`CodeEditorState`, `CodeEditorHistory`), [01-creacionales/05.2-inmutabilidad.ts](01-creacionales/05.2-inmutabilidad.ts) (`Player`)

- Singleton
  - Archivos: [01-creacionales/06-singleton.ts](01-creacionales/06-singleton.ts), [01-creacionales/06.2-singleton.ts](01-creacionales/06.2-singleton.ts) (`DatabaseConnection`), [01-creacionales/06.2.1-singleton.ts](01-creacionales/06.2.1-singleton.ts)

- Factory Function
  - Archivos: [01-creacionales/07-factory-function.ts](01-creacionales/07-factory-function.ts), [01-creacionales/07.2-factory-function.ts](01-creacionales/07.2-factory-function.ts) (`createLogger`)

## Utilidades
- Colores para logs: [helpers/colors.ts](helpers/colors.ts) (`COLORS`)
- Sleep helper: [helpers/sleep.ts](helpers/sleep.ts) (`sleep`)
- Configuración Deno: [deno.json](deno.json)

## Cómo contribuir
- Añade nuevos patrones en carpetas separadas (por ejemplo: 02-estructurales, 03-comportamiento).
- Mantén ejemplos simples y autoejecutables (main()).
- Documenta el patrón y deja tareas/ejercicios para practicar.

## Licencia
Proyecto educativo — agregar licencia según prefieras (MIT recomendado).