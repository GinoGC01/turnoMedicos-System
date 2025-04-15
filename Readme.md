# 🏥 Turno Médicos System - Backend

Este repositorio contiene el backend de un sistema de turnos médicos, desarrollado en Node.js. Integra funcionalidades como gestión de consultorios, profesionales, usuarios, turnos, integración con Google Sheets y pagos mediante Mercado Pago. Además, incluye envío de notificaciones por correo electrónico y validaciones de seguridad.

---

## 🗂 Estructura del Proyecto
```bash
turnoMedicos-System/
│
├── .gitignore 
├── package.json 
├── ngrok.exe 
├── src/ 
│ ├── app.js 
│ ├── config.js 
│ ├── index.js 
│ ├── config/ 
│ │ └── db.js 
│ ├── controllers/ 
│ │ ├── consultoriosControllers.js 
│ │ ├── emailsControllers.js 
│ │ ├── googleSheets.js 
│ │ ├── paymentController.js 
│ │ ├── turnosControllers.js 
│ │ └── userControllers.js 
│ ├── middlewares/ 
│ │ └── cors.js 
│ ├── models/ 
│ │ ├── consultorios.js 
│ │ ├── professionals.js 
│ │ ├── turnos.js 
│ │ └── user.js 
│ ├── routes/ 
│ │ ├── consultorios.routes.js 
│ │ ├── turnos.routes.js 
│ │ └── users.routes.js 
│ ├── schemas/ 
│ │ └── dataReferenceSchema.js 
│ ├── utils/ 
│ │ ├── bodys/ 
│ │ │ ├── bodyForOrderMercadoPago.js 
│ │ │ ├── htmlPaymentBody.js 
│ │ │ └── sheetSlot.js 
│ │ ├── emails/ 
│ │ │ └── SendEmailSavedSlot.js 
│ │ ├── mercadoPago/ 
│ │ │ ├── getClientMP.js 
│ │ │ └── webhookPayment.js 
│ │ ├── verifications/ 
│ │ │ ├── checkAvailabiltySlot.js 
│ │ │ ├── checkUserExist.js 
│ │ │ ├── verification.atentionRegistered.js 
│ │ │ └── verifySignature.js 
│ │ ├── calculateMinDurationSvProfesional.js 
│ │ ├── findAvailableSlotsByMonthYear.js 
│ │ ├── generateSlots.js 
│ │ ├── saveTurnoandWritingSheets.js 
│ │ └── writeInSheets.js
```
---

## 🔧 Instalación

```bash
git clone https://github.com/usuario/turnoMedicos-System.git
cd turnoMedicos-System
npm install
npm start

```

## 🔐 Asegúrate de configurar un archivo .env con las siguientes variables:

1. MONGODB_URI

2. PORT

3. MERCADO_PAGO_ACCESS_TOKEN

4. GOOGLE_SHEETS_CREDENTIALS

5. y otras claves necesarias.
---
## 🧠 Descripción General
### Este backend provee una API RESTful que permite:

1. ✔️ Registrar, consultar y eliminar turnos médicos

2. 🏥 Administrar consultorios y profesionales

3. 📅 Verificar disponibilidad de horarios en tiempo real

4. 📤 Guardar información de turnos en Google Sheets

5. 💳 Procesar pagos con Mercado Pago

5. 📧 Enviar emails automáticos de confirmación
---
## 📦 Componentes del Proyecto
## 1) Controladores (src/controllers/)
### Encargados de la lógica de negocio. Ejemplo:

- turnosControllers.js: Crear, validar y listar turnos.

- paymentController.js: Crear órdenes de pago con Mercado Pago y manejar callbacks.

- emailsControllers.js: Enviar confirmaciones por email.

- googleSheets.js: Guardar datos en Google Sheets.

## 2) Modelos (src/models/)
### Modelos de Mongoose para MongoDB:

- turnos.js, user.js, consultorios.js, professionals.js.

## 3) Rutas (src/routes/)
### Definen los endpoints del backend:

- /turnos

- /consultorios

- /users

## 4) Utils (src/utils/)
### Funciones auxiliares para procesamiento:

- generateSlots.js: Genera franjas horarias.

- writeInSheets.js: Escribe datos en Sheets.

- verifySignature.js: Valida firma de Mercado Pago.

## 5) Middlewares (src/middlewares/)
- cors.js: Configura CORS para permitir acceso desde frontend.

## 5) Schemas (src/schemas/)
- Esquemas auxiliares de referencia.

### 📝 Licencia
© Gino Ciancia. Todos los derechos reservados. El uso, distribución o modificación de este código está prohibido sin autorización expresa.

# 📂 src/controllers/ – Controladores

## 📦 Controladores

Los controladores contienen la lógica principal de la aplicación. Aquí se definen las operaciones que se ejecutan al recibir peticiones desde las rutas.

---

### 🏥 consultoriosControllers.js

Controla la creación, obtención y actualización de consultorios.

#### Funciones principales:

- `getConsultorios`: Devuelve todos los consultorios registrados.
- `getConsultorioById`: Devuelve los datos de un consultorio específico.
- `createConsultorio`: Crea un nuevo consultorio en la base de datos.
- `updateConsultorio`: Actualiza información de un consultorio existente.

---

### 📬 emailsControllers.js

Se encarga de enviar correos electrónicos de confirmación.

#### Funciones principales:

- `sendEmailSavedSlot`: Envía un correo confirmando que el turno fue reservado exitosamente.

---

### 📊 googleSheets.js

Permite guardar datos de los turnos y usuarios en una hoja de cálculo de Google Sheets.

#### Funciones principales:

- `writeTurnoInSheet`: Escribe los datos de un turno confirmado en una fila.
- `writeUserInSheet`: Escribe los datos del paciente que solicitó el turno.

---

### 💳 paymentController.js

Administra el flujo de pago utilizando la API de Mercado Pago.

#### Funciones principales:

- `createOrder`: Genera una preferencia de pago a partir de los datos del turno.
- `webhookPaymentHandler`: Recibe notificaciones del estado de pagos (webhook de Mercado Pago).
- `verifyPayment`: Verifica si el pago fue exitoso.

---

### 🕑 turnosControllers.js

Gestión completa de turnos médicos: creación, validación, obtención.

#### Funciones principales:

- `createTurno`: Crea un nuevo turno si hay disponibilidad.
- `getAllTurnos`: Devuelve todos los turnos registrados.
- `getTurnosByFecha`: Lista turnos según una fecha específica.
- `checkDisponibilidad`: Verifica si hay un turno disponible en una fecha y hora dadas.
- `deleteTurno`: Elimina un turno por ID.

---

### 👤 userControllers.js

Gestión de usuarios/pacientes.

#### Funciones principales:

- `getUserByDNI`: Verifica si un usuario está registrado según su DNI.
- `createUser`: Registra un nuevo paciente en la base de datos.


## 🛣️ Rutas de la API

Esta carpeta define todos los endpoints disponibles del sistema. Cada ruta está asociada a uno o varios controladores que ejecutan la lógica correspondiente.

---

### 📁 consultorios.routes.js

Rutas relacionadas a la gestión de consultorios médicos.

#### Endpoints:

- `GET /consultorios`: Devuelve todos los consultorios.
- `GET /consultorios/:id`: Devuelve un consultorio por su ID.
- `POST /consultorios`: Crea un nuevo consultorio.
- `PUT /consultorios/:id`: Actualiza un consultorio existente.

---

### 📁 turnos.routes.js

Rutas que permiten operar sobre turnos médicos.

#### Endpoints:

- `GET /turnos`: Devuelve todos los turnos registrados.
- `GET /turnos/fecha/:fecha`: Devuelve los turnos de una fecha específica.
- `POST /turnos`: Crea un nuevo turno, validando la disponibilidad.
- `DELETE /turnos/:id`: Elimina un turno por su ID.
- `GET /turnos/disponibilidad`: Verifica si existe disponibilidad para un profesional en una fecha y hora determinada.

---

### 📁 users.routes.js

Rutas para manejar información de pacientes.

#### Endpoints:

- `GET /users/:dni`: Busca un usuario por DNI.
- `POST /users`: Crea un nuevo usuario.


# 📂 src/models/ – Modelos de Base de Datos

## 🧩 Modelos de Base de Datos (MongoDB + Mongoose)

Los modelos definen la estructura de los datos en la base de datos utilizando Mongoose. Cada uno representa una colección en MongoDB.

---

### 📁 consultorios.js

Modelo para representar los consultorios médicos disponibles en el sistema.

#### Campos principales:

- `name` (String): Nombre del consultorio.
- `address` (String): Dirección del consultorio.
- `phone` (String): Teléfono de contacto.
- `email` (String): Correo electrónico.
- `professionals` (Array): Lista de profesionales asociados (IDs referenciados al modelo `professionals`).

---

### 📁 professionals.js

Modelo para representar a los profesionales de la salud.

#### Campos principales:

- `name` (String): Nombre del profesional.
- `specialty` (String): Especialidad médica.
- `duration` (Number): Duración estándar del turno en minutos.
- `consultorio` (ObjectId): ID del consultorio donde atiende (relación con `consultorios`).
- `daysAvailable` (Array): Días de la semana en que atiende.
- `timeRange` (Object): Rango horario por día (ej: `{ from: "08:00", to: "12:00" }`).

---

### 📁 turnos.js

Modelo que representa un turno médico agendado.

#### Campos principales:

- `date` (Date): Fecha y hora del turno.
- `userId` (ObjectId): Referencia al paciente que tomó el turno (`user`).
- `professionalId` (ObjectId): Referencia al profesional que atenderá el turno.
- `consultorioId` (ObjectId): Referencia al consultorio.
- `estado` (String): Estado del turno (`pendiente`, `confirmado`, `cancelado`).
- `pago` (Boolean): Indica si el turno fue pagado.
- `metodoPago` (String): Método utilizado (ej: `mercado_pago`, `efectivo`).

---

### 📁 user.js

Modelo que representa a los usuarios o pacientes.

#### Campos principales:

- `name` (String): Nombre completo del paciente.
- `dni` (String): Documento Nacional de Identidad (único).
- `email` (String): Correo electrónico del paciente.
- `telefono` (String): Teléfono de contacto.
- `fechaNacimiento` (Date): Fecha de nacimiento.
- `obraSocial` (String): Obra social, si aplica.

---

# 📂 src/utils/ – Funciones auxiliares y de integración

## 🧰 Utils – Funciones Auxiliares

Este módulo contiene funciones reutilizables que permiten realizar tareas específicas como generar horarios, validar usuarios, escribir en hojas de cálculo, y procesar pagos.

---

### 📁 bodys/

#### 📄 bodyForOrderMercadoPago.js

```js
module.exports = (data) => ({ ... })
```

- __Descripción__:
Genera el cuerpo (payload) necesario para crear una orden de pago con la API de Mercado Pago. Toma como parámetro un objeto con los datos del turno y del paciente, y devuelve un JSON con los detalles de la preferencia.

- __Usos comunes__:
Se utiliza en paymentController.js dentro de la función createOrder.

---
#### 📄 htmlPaymentBody.js
- __Descripción__:
Contiene una plantilla HTML que se utiliza para el contenido del correo de confirmación de pago.
---
#### 📄 sheetSlot.js
- __Descripción__:
Plantilla de los datos que se escriben en Google Sheets, como nombre del paciente, fecha, hora, profesional, etc.
---
### 📁 emails/
#### 📄 SendEmailSavedSlot.js

```js
module.exports = async function SendEmailSavedSlot({ email, turnoData })
```

- __Descripción__:
Envía un correo al paciente confirmando que el turno fue registrado correctamente. Usa la plantilla definida en htmlPaymentBody.js.
---
### 📁 mercadoPago/
#### 📄 getClientMP.js

```js
const mercadopago = require("mercadopago");
```

- __Descripción__:
Configura y devuelve la instancia del cliente de Mercado Pago con el ACCESS_TOKEN tomado del entorno.
---
#### 📄 webhookPayment.js

```js
module.exports = async function webhookPayment(req, res)
```
- __Descripción__:
Maneja la notificación (webhook) de Mercado Pago cuando hay un cambio de estado en una transacción. Verifica la firma digital y, si es válida, actualiza el turno en la base de datos como pagado.
---
### 📁 verifications/
#### 📄 checkAvailabiltySlot.js
```js
module.exports = async function checkAvailability({ profesionalId, date })
```
- __Descripción__:
Verifica si un profesional tiene un turno disponible en una fecha y hora específica. También consulta si ya existe un turno reservado en ese horario.

- __Flujo__:

1. Consulta la disponibilidad del profesional.

2. Verifica si la franja horaria está libre.

3. Devuelve true si está disponible, false si ya hay un turno.

---
#### 📄 checkUserExist.js
```js
module.exports = async function checkUserExist(dni)

```
- __Descripción__:
Verifica en la base de datos si existe un usuario con el DNI proporcionado. Devuelve el usuario si existe o null si no.
---
#### 📄 verification.atentionRegistered.js
- __Descripción__:
Función que comprueba si un profesional ya tiene atención médica registrada en un horario determinado. Evita duplicaciones.
---
#### 📄 verifySignature.js
```js
module.exports = function verifySignature(headers, body, secret)
```

- __Descripción__:
Verifica que la firma (signature) del webhook de Mercado Pago sea válida, comparando el `x-signature` del header con un hash SHA256 generado localmente.
---
#### 📄 calculateMinDurationSvProfesional.js

```js
module.exports = function calculateMinDuration(professional)
```
- __Descripción__:
Calcula la duración mínima del turno para un profesional, basada en su configuración (duration en minutos).
---
#### 📄 findAvailableSlotsByMonthYear.js
```js
module.exports = async function findAvailableSlots(professionalId, month, year)
```
- __Descripción__:
Busca todos los turnos disponibles para un profesional durante un mes y año determinados. Analiza días y horas disponibles.
---
#### 📄 generateSlots.js
```js
module.exports = function generateSlots({ from, to, duration })
```
- __Descripción__:
Genera un array de franjas horarias (slots) entre un horario de inicio y fin, según la duración establecida. Por ejemplo, si el horario es de 08:00 a 10:00 y la duración es 30 minutos, genera:

 - 08:00

 - 08:30

 - 09:00

 - 09:30

---
#### 📄 saveTurnoandWritingSheets.js
```js
module.exports = async function saveTurnoandWritingSheets(turnoData)
```
- __Descripción__:
Guarda el turno en la base de datos y lo escribe automáticamente en una hoja de Google Sheets. También puede desencadenar el envío del email.
---
#### 📄 writeInSheets.js
```js
module.exports = async function writeInSheets(datos)
```
- __Descripción__:
Escribe directamente datos en la hoja de cálculo de Google Sheets. Se utiliza como capa inferior de abstracción para interacciones con Sheets.

# 📄 Archivos raíz – Configuración y ejecución del backend
## 🔧 Archivos Principales

Estos archivos componen el núcleo del servidor, donde se configura y se inicia la aplicación, además de conectar la base de datos y aplicar middlewares.

---

### 📄 app.js

Archivo central donde se configura Express y se integran los middlewares, rutas y utilidades.

#### Principales funcionalidades:

- Carga de variables de entorno (`dotenv`).
- Uso de middlewares:
  - `cors`: permite el acceso desde dominios externos.
  - `express.json()`: permite parsear JSON en los requests.
- Configura rutas:
  - `/api/consultorios`
  - `/api/turnos`
  - `/api/users`
- Ruta test: `/ping` devuelve `"pong"` para comprobar que el servidor está corriendo.
- Middleware de manejo de errores (`handleErrors`).

---

### 📄 index.js

Archivo que arranca el servidor y se asegura de que la base de datos esté conectada.

#### Flujo principal:

1. Importa `app` desde `app.js`.
2. Importa la función `connectDB` para conectar con MongoDB.
3. Llama a `connectDB()` antes de iniciar el servidor.
4. Escucha en el puerto definido por la variable de entorno `PORT`.

---

### 📁 database/db.js

Archivo que gestiona la conexión a MongoDB usando Mongoose.

```js
const connectDB = async () => { ... }
```

- Utiliza la URI definida en .env.

- Lanza mensajes por consola sobre el estado de la conexión (exitosa o con error).

---
### 📁 middlewares/handleErrors.js
Middleware personalizado para manejo de errores globales.
```js
const handleErrors = (err, req, res, next) => { ... }
```
- Si ocurre un error no controlado, este middleware devuelve una respuesta JSON con el mensaje del error y el status correspondiente.

- Permite mantener la lógica limpia en los controladores.
---
### 📄 .env.example
Ejemplo del archivo de variables de entorno necesarias para correr el proyecto.

__Variables típicas:__
1. `PORT` =3000

2. `MONGO_URI`=...

3. `ACCESS_TOKEN_MP`=... (token de Mercado Pago)

4. `SHEET_ID`=... (ID de la hoja de Google Sheets)

5. `GOOGLE_PRIVATE_KEY`=... (clave privada para Sheets API)

6. `GOOGLE_CLIENT_EMAIL`=...

--- 

### 🧪 Testeo y desarrollo
El proyecto aún no incluye pruebas automatizadas, pero se sugiere el siguiente enfoque para testing:

1. __Postman o Insomnia: Ideal para probar endpoints manualmente.__

2. __Tests automáticos__ (sugerencia futura):

- Jest + Supertest para testear rutas y lógica de negocio.

- Mocks de Mongoose y Mercado Pago para pruebas sin conexión externa.
---

### ✅ Estado actual
Este backend se encuentra en __proceso de desarrollo activo__, y ya implementa:

- Registro y validación de pacientes.

- Gestión de consultorios y profesionales.

- Agenda médica con disponibilidad por días y horarios.

- Integración con Mercado Pago para cobros online.

- Registro automático en Google Sheets.

- Envío de emails de confirmación.
