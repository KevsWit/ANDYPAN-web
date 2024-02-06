# Sistema de Gestión Eficiente de Panadería (SGEP)

## Descripción
El Sistema de Gestión Eficiente de Panadería (SGEP) es una aplicación diseñada para facilitar la venta de productos de la panadería ANDYPAN. La aplicación proporciona una interfaz intuitiva y minimalista para una experiencia de usuario accesible y eficiente.

## Funcionalidades Principales
- **Catálogo de Productos:** Presenta un catálogo con el nombre, una imagen y el precio de cada producto disponible en la panadería.
- **Detalle del Producto:** Al seleccionar un producto del catálogo, se muestra un formulario con los detalles del producto, incluyendo un campo para la cantidad deseada.
- **Cálculo del Precio Parcial:** Al hacer clic en 'Guardar' en el formulario de detalle del producto, se calcula automáticamente el precio parcial del producto (cantidad de producto * precio unitario).
- **Cálculo del Precio Total:** Se proporciona un botón de 'Calcular' que suma los precios parciales de todos los productos seleccionados y muestra el precio total de la venta.
- **Almacenamiento de Detalles de la Venta:** Al presionar 'Guardar', se guardan los detalles de la venta, incluido el precio total, en la base de datos. Esto junto con los datos para la factura.

## Interfaz de Usuario
- **Diseño Nítido:** Las imágenes en la interfaz son nítidas para una mejor visualización de los productos.
- **Tamaño de Fuente Adecuado:** Se garantiza un tamaño de fuente adecuado para facilitar la legibilidad de la información en la aplicación.

## Tecnologías Utilizadas
- Angular: Framework de desarrollo de aplicaciones web.
- TypeScript: Lenguaje de programación para el desarrollo de aplicaciones web.
- HTML y CSS: Lenguajes de marcado y estilos para el diseño y la presentación de la aplicación.
- Node.js: Entorno de ejecución de JavaScript del lado del servidor.
- Base de Datos Centralizada: Se utiliza una base de datos centralizada para almacenar la información de los productos y los detalles de las ventas.

## Instalación
1. Instala todas las dependencias del proyecto con el comando `npm install`.
```
npm install -g npm@latest
```
```
npm init -y
```
```
npm install express mongoose body-parser cors morgan nodemon -D
```
2. Limpia el sistema y las versiones anteriores de Angular.
```
npm cache clean --force
```
```
npm uninstall -g angular-cli
```
```
npm uninstall -g angular/cli
```
3. Deshabilita las comprobaciones automáticas de seguridad de npm.
```
npm set audit false
```
4. Instala angular/cli y crea un proyecto de angular.
```
npm install -g @angular/cli@latest
```
```
ng new --no-standalone frontend
```
5. Clona este repositorio en tu máquina local.
6. Agrega en package.json la línea en `scripts`.
```
"dev": "nodemon server/index.js"
```
7. Inicia la API con el comando `npm run dev`.
8. Inicia la aplicación con el comando `ng serve --host 0.0.0.0`.
9. Restablecer las colecciones de datos.
9.1. Haz clic en `ADD DATA`.
9.2. Importa el JSON file.

## Implementación de cluster MongoDB en Azure
- Se ha actualizado el sistema para el uso de una base de datos en la nube, en Azure.
- En el documento `database.js` se encuentra el formato de la cadena de conexión que se usó.

## Contribución
- Si deseas contribuir a este proyecto, por favor crea un pull request describiendo tus cambios propuestos.

## Autor
- [Kevin Castillo](https://github.com/KevsWit)
- Email: kev.gcastillo@outlook.com

