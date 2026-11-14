# Semana 3 - Tarea 1
Crear mediante C# el crud de la tabla clientes en un entorno web
## Configuración
- Tras descargar el fuente, ejecutar `docker compose up --build -d` o sino `docker-compose up --build -d` para instalar las dependencias, compilar el fuente y ejecutar el proyecto en el puerto **5080**
## Ejecución
- EL frontend se ejecuta al abrir `wwwroot/index.html` en el navegador web
- El backend se ejecuta en `http://localhost:5080/api/Cliente`
- MySQL se ejectua en el puerto **3306**
- Adminer (UI para mysql) se ejecuta en `http://localhost:8081`

En caso de error, revisar la configuración en el archivo `docker-compose.yml`
