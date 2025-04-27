/* eslint-disable camelcase */
export const htmlPaymentBody = (dataSheets) => {
  const { nombre, especialista, profesion, servicio, fecha, hora, payment_id, payment_payer_email, payment_transaction_amount, payment_payer_identification, pendingPayment, payment_fecha, nombreConsultorio } = dataSheets

  const html = `<html>
    <head>
    <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            width: 100%
          }
          .container {
            background-color: rgba(248, 248, 248, 0.7);
            max-width:50em;
            margin:auto;
            border-radius: 5px;
          }
          .header {
            background-color: #007BFF;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
            margin-bottom: 10px;
          }
          .container > p, h3 {
            padding: 0px 20px;
          }

          a{
            display:block;
            padding: 10px 15px;
            border-radius: 7px;
            background-color: #007BFF;
            color:white !important;
            text-decoration: none;
            text-align:center;
            max-width: 60%;
            margin: 30px auto;
            transition: scale 200ms, background-color 200ms;
          }

          a:hover{
            scale: 1.05;
            background-color: #006fe6;
          }
      
      table {
            width: 100%;
            max-width: 730px;
            margin: 0 auto;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
            color: #333;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #00c1ff;
            font-weight: bold;
            color: white;
        }

          .footer {
            background-color: #004a99;
            padding: 10px;
            text-align: center;
            border-radius: 0 0 5px 5px;
            font-size: 12px;
            color: #fff;
            margin-top: 20px;
          }      

        </style>
    </head>
    <body>
      <div class="container">
      <header class="header">
        <h1>Turno registrado con exito</h1>
      </header>
        <p>Hola ${nombre}:</p>
    
        <p>Su turno para: <b>${servicio}</b> fue registrado con exito </p>

      <h3>Detalles del turno: </h3>

      <ul>
        <li>
          <strong>
            Especialidad: 
          </strong>
          <p>
            ${profesion}
          <p/>
        </li>
        <li>
          <strong>
            Especialista:
          </strong>
          <p>
            ${especialista}
          <p/>
        </li>
        <li>
          <strong>
            Dia y hora:
          </strong>
          <h3>
            ${fecha} - ${hora}
          <h3/>
        </li>
      </ul>
  
      <h3>Detalles del Comprobante: </h3>
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>DNI</th>
                <th>Pago</th>
                <th>Fecha</th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="ID">${payment_id}</td>        
                <td data-label="Email">${payment_payer_email}</td>
                <td data-label="DNI">${payment_payer_identification}</td>
                <td data-label="Pago">$${payment_transaction_amount}</td>
                <td data-label="Fecha">${payment_fecha}</td>
            </tr>
        </tbody>
    </table>
        
      <h3>Pago pendiente: $${pendingPayment} </h3>

    
        <p>Recuerde corroborar estos datos el dia del turno con el personal correspondiente para pagar el restante al saldo del turno</p>
    
      <footer class="footer">

        <p>${nombreConsultorio}</p>
      </footer>
    </div>
    </body>
    </html>`
  return html
}
