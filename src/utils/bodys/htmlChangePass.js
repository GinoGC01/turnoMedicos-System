export const htmlChangePass = ({ nombre, pass }) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenida a NOMBRE CONSULTORIO</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7fafc;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 30px;
          border-top: 4px solid #4f46e5;
        }
        .header {
          text-align: center;
          margin-bottom: 25px;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 15px;
        }
        h1 {
          color: #4f46e5;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 25px;
        }
        .password-box {
          background-color: #f3f4f6;
          border-left: 3px solid #4f46e5;
          padding: 12px 15px;
          margin: 20px 0;
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          border-radius: 0 4px 4px 0;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: white !important;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <!-- Reemplaza con tu logo real -->
          <img src="https://ejemplo.com/logo-consultorio.png" alt="Logo Consultorio" class="logo">
          <h1>¡Bienvenido/a a NOMBRE CONSULTORIO!</h1>
        </div>
        
        <div class="content">
          <p>Hola <strong>${nombre}</strong>,</p>
          
          <p>Acabas de registrarte en nuestro sistema como paciente. Se ha generado una contraseña temporal para tu cuenta:</p>
          
          <div class="password-box">
            ${pass}
          </div>
          
          <p>Por seguridad, te recomendamos cambiar esta contraseña al ingresar por primera vez.</p>
          
          <a href="https://tudominio.com/cambiar-password" class="button">Cambiar Contraseña</a>
        </div>
        
        <div class="footer">
          <p>Gracias por confiar en nosotros.</p>
          <p>Si no realizaste este registro, por favor contacta con nuestro soporte.</p>
          <p>© ${new Date().getFullYear()} NOMBRE CONSULTORIO. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
    `

  return html
}
