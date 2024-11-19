# Track smarter, spend better 💰📊

**Track smarter, spend better** te permite llevar un control de tus finanzas personales de manera fácil y eficiente. Puedes agregar, editar y eliminar tus gastos e ingresos, con la opción de organizarlos por **categorías personalizadas** y añadir **descripciones**. Además, tiene un diseño **responsive** que se adapta a todos los dispositivos 📱💻.

[Watch the video](https://vimeo.com/1031260098)

## Características 🎉

- **Agregar gastos e ingresos**: Registra tus gastos e ingresos con fecha, categoría personalizada y descripción. ¡Mantén todo organizado! 📝
- **Editar entradas**: ¿Te olvidaste de algo? ¡No hay problema! Puedes editar cualquier gasto o ingreso registrado. ✏️
- **Eliminar entradas**: Si alguna entrada ya no es relevante, puedes eliminarla con facilidad 🗑️.
- **Diseño Responsive**: La aplicación se adapta a cualquier dispositivo, ya sea móvil, tablet o pc. ¡Perfecta para consultar tus finanzas en cualquier lugar! 📱💻
- **Categorías personalizadas**: Organiza tus gastos e ingresos como quieras, añadiendo categorías que se ajusten a tus necesidades 🏷️.

## Tecnologías Utilizadas ⚙️

- **Frontend**: React, HTML, SASS
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL

## Instalación 🚀

Sigue estos pasos para tener la aplicación corriendo en tu máquina local:

1. Clona el repositorio:
   
    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repositorio.git

2. Instala las dependencias:

    ```bash
    npm install

3. Importa las tablas necesarias:

   - En la carpeta `bd`, encontrarás el archivo `.dump.sql`. Importa este archivo en tu base de datos MySQL.

4. Configura variables de entorno .env en el directorio raíz del proyecto y añade las siguientes variables :

   - Variables como la URL de la base de datos pueden ser configuradas en un archivo `.env`.

    ```bash
    DB_HOST=            # Host de la base de datos (e.g., localhost)
    DB_USER=            # Usuario de la base de datos (e.g., root)
    DB_PASSWORD=        # Contraseña del usuario
    DB_NAME=            # Nombre de la base de datos
    ```
5. Inicia el servidor:

    ```bash
    npm start
    ```
    El servidor debería iniciarse en `http://localhost:3000`.

## Futuras Actualizaciones 🔮

¡Aquí van algunas de las cosas emocionantes que vienen pronto!

- **Filtros personalizados**: Se añadirán filtros para cada campo de los gastos e ingresos, como fechas, categorías y descripciones. 🔍
- **Resumen de gastos**: Se incluirá un resumen anual y mensual de tus gastos. ¡Verás cómo va tu economía! 📅💸
- **Autenticación de usuario (Login)**: Se integrará un sistema de inicio de sesión para que cada usuario tenga su propio registro de gastos. 🔐
- **Pruebas (Testing)**: Se agregarán pruebas unitarias e integrales para asegurar que todo funcione correctamente. ✅

## Contribuciones 🤝

¡Me encantaría que aportaras al proyecto! Si quieres colaborar, solo sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
3. Realiza tus cambios y haz un commit (git commit -m 'Añadir nueva característica').
4. Sube los cambios a tu fork (git push origin feature/nueva-caracteristica).
5. Abre un pull request describiendo los cambios.


¡Gracias por usar mi gestor de gastos e ingresos! 😊 ¡Esperamos que te ayude a llevar un mejor control de tus finanzas!
