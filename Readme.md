# 🏥 Turno Médicos System - Backend

Este repositorio contiene el backend de un sistema de turnos médicos, desarrollado en Node.js. Integra funcionalidades como gestión de consultorios, profesionales, usuarios, turnos, integración con Google Sheets y pagos mediante Mercado Pago. Además, incluye envío de notificaciones por correo electrónico y validaciones de seguridad.

---

## 🗂 Estructura del Proyecto

turnoMedicos-System/ 
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
1. Controladores (src/controllers/)
### Encargados de la lógica de negocio. Ejemplo:

- turnosControllers.js: Crear, validar y listar turnos.

- paymentController.js: Crear órdenes de pago con Mercado Pago y manejar callbacks.

- emailsControllers.js: Enviar confirmaciones por email.

- googleSheets.js: Guardar datos en Google Sheets.

2. Modelos (src/models/)
### Modelos de Mongoose para MongoDB:

- turnos.js, user.js, consultorios.js, professionals.js.

3. Rutas (src/routes/)
### Definen los endpoints del backend:

- /turnos

- /consultorios

- /users

4. Utils (src/utils/)
### Funciones auxiliares para procesamiento:

- generateSlots.js: Genera franjas horarias.

- writeInSheets.js: Escribe datos en Sheets.

- verifySignature.js: Valida firma de Mercado Pago.

5. Middlewares (src/middlewares/)
- cors.js: Configura CORS para permitir acceso desde frontend.

6. Schemas (src/schemas/)
- Esquemas auxiliares de referencia.

### 📝 Licencia
© Gino Ciancia. Todos los derechos reservados. El uso, distribución o modificación de este código está prohibido sin autorización expresa.




