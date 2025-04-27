# Bego Backend Checkpoint

Repositorio con el código de la prueba técnica para Bego Backend Developer

## Inicializar el proyecto

1. Clonar el proyecto.

2. Crear un archivo `.env` basado en el `env.template`.

3. Instalar de dependencias del proyecto mediante el siguiente comando.
```
npm install
```
4. Crear base de datos MongoDB mediante Docker o [MongoAtlas](https://www.mongodb.com/es/atlas)
Recuerda agregar la cadena de conexión en el archivo .env.

5. Ejecución del proyecto.

Una vez hecho los pasos anteriores ejecutar el siguiente comando:

```
npm run start:dev
```

6. Importación del archivo de [Postman](https://www.postman.com/downloads/) para probar los endpoints de la API (opcional).
Variables para el uso de endpoints de Postman:
- DEV: http://localhost:3000/api
- ValidToken: Token generado al momento de hacer login en el endpoint correspondiente.


## Realización de la API
Para desarrollar la siguiente API tuve muy en cuenta los requisitos listados en las instrucciones ademas de ir mas allá agregando validaciones que pueden ayudar a mejorar la funcionalidad de la API sin sobrecomplicar la prueba mas allá de lo especificado. 

### Configuración general

Para configurar el proyecto se realizaron implementaciones para la validación de variables de entorno mediante [JOI](https://www.npmjs.com/package/joi), indicando que variables de entorno se necesitan asi como las características de cada una de ellas.

También se agregaron validaciones mediante DTOs en cada uno de los endpoints que lo requerían para evitar parámetros no deseados asi como agregar validaciones para cada uno de ellos.

A su vez se usaron las relaciones necesarias para la base de datos mediante [Mongoose](https://www.npmjs.com/package/mongoose) para tener referencias sobre los datos esperados para cada una de las colecciones en la base de datos.

Se implemento un manejo de errores personalizado, que se encarga de lanzar errores personalizados en casos comunes como BadRequest, NotFound, Unauthorized, etc.

Finalmente se agregaron Guards en cada uno de los endpoints necesarios para la validación del Token mediante [JWT](https://www.npmjs.com/package/@nestjs/jwt) asi como Pipes personalizadas para verificar que las ids proporcionadas sean ids de MongoDB validas.

### Users Domain
Para realizar este dominio tuve en cuenta las buenas practicas al momento de desarrollar un CRUD con autenticación y autorización como son los siguientes:

- Validación de correo de usuario (no duplicados).
- Hash de contraseña para mejorar la seguridad de la aplicación mediante Bcryptjs.
- Creación de token para autorización en endpoints.
- No retorno de datos sensibles o innecesarios como el password o __v.

### Trucks Domain
De igual manera se tomaron en cuenta los requisitos ademas de implementar validaciones al momento de crear un nuevo camion como:
- Verificar que el id del usuario de un id de MongoDB valido.
- Verificar que el usuario este registrado en la base de datos al momento de crear un nuevo camion.

Una validación extra que se implemento fue verificar que las placas de los camiones sean únicas para evitar duplicados en la base de datos.

También se agrego un endpoint extra para obtener todos los camiones de un usuario en especifico, esto con el fin de mejorar la experiencia del usuario al momento de buscar sus camiones.

### Locations Domain
Para este dominio se hizo uso de la API de Places de Google para obtener los datos de una dirección mediante el place_id proporcionado en las instrucciones asi como algunos extra que da Google de ejemplo todo esto mediante el uso de axios para realizar la petición a la API.

Al igual que en dominios anteriores se implementaron validaciones para evitar parámetros no deseados o incorrectos en la request, verificación del uso de tokens validos en las peticiones, asi como una validación para evitar que existan place_id duplicados para evitar que existan ubicaciones duplicadas.

También se creo un archivo interface para definir la estructura de los datos que se obtienen de la API de Google, esto con el fin de tener un mejor control sobre los datos manejados en la aplicación.

### Orders Domain
Finalmente en este dominio se implemento una integración con los otros dominios para poder generar una orden como se especifica en las instrucciones.

Se creo una funciona para la validación de cada uno de los parámetros necesarios para la creación de una orden, como lo son:

- Verificar que el id de usuario sea valido y exista en la base de datos.
- Verificar que el id de camion sea valido y exista en la base de datos.
- Verificar que el camion pertenezca al usuario proporcionado en la Id de la request.
- Verificar que el id de la ubicación de origen y destino sean validas y existan en la base de datos.

Finalmente se implemento una validación en el cambio del status de la orden, verificando que si el status proporcionado en la request es igual al que tiene actualmente la orden, no se realice ninguna operación, para evitar hacer cambios consultas innecesarias en la base de datos.

## Conclusión
Durante el desarrollo de la prueba técnica se tomaron en cuenta las buenas practicas de programación siguiendo los principios SOLID ademas de agregar validaciones extras asi como implementación de Interfaces, DTOs y Guards personalizados con el fin de demostrar mis conocimientos en el desarrollo de aplicaciones con NestJS y MongoDB conforme a los requisitos solicitados en la vacante.

## API endpoints
Para saber los parámetros esperados en cada uno de los endpoints revisar el siguiente archivo [Endpoints](API_ENDPOINTS.md) donde se especifican los endpoints, los parámetros esperados y el formato de respuesta esperado.

## Contacto

Cualquier duda o aclaración respecto al proyecto mandar correo al siguiente correo <b>migueltorresc299@gmail.com</b>