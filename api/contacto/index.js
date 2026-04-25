const { TableClient } = require("@azure/data-tables");
const nodemailer = require("nodemailer");

function getTableClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.TABLE_NAME || "reservasEventoprimero";

  return TableClient.fromConnectionString(connectionString, tableName);
}

async function enviarEmailConfirmacion(reserva, context) {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Brice Eventos" <${process.env.EMAIL_FROM}>`,
    to: reserva.email,
    subject: "Reserva confirmada",
    html: `
      <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
        <h2>Reserva confirmada</h2>

        <p>Hola ${reserva.nombre},</p>

        <p>Hemos recibido correctamente tu solicitud para el evento.</p>

        <p><strong>Datos de la reserva:</strong></p>
        <ul>
          <li><strong>Nombre:</strong> ${reserva.nombre} ${reserva.apellido}</li>
          <li><strong>Email:</strong> ${reserva.email}</li>
          <li><strong>Teléfono:</strong> ${reserva.telefono || "No indicado"}</li>
          <li><strong>Asistentes:</strong> ${reserva.asistentes || "No indicado"}</li>
        </ul>

        <p>Te contactaremos pronto con más detalles.</p>

        <br>
        <p><strong>Equipo Brice Eventos</strong></p>
        <p style="font-size: 12px; color: #777;">
          Powered by Graxiano
        </p>
      </div>
    `
  });

  context.log("Email enviado correctamente a:", reserva.email);
}

module.exports = async function (context, req) {
  try {
    const data = req.body || {};

    const nombre = (data.nombre || "").trim();
    const apellido = (data.apellido || "").trim();
    const email = (data.email || "").trim();
    const telefono = (data.telefono || "").trim();
    const paisNacimiento = (data.paisNacimiento || "").trim();
    const edad = String(data.edad || "").trim();
    const ciudadResidencia = (data.ciudadResidencia || "").trim();
    const paisResidencia = (data.paisResidencia || "").trim();
    const asistentes = String(data.asistentes || "").trim();
    const mensaje = (data.mensaje || "").trim();

    // VALIDACIÓN
    if (!nombre || !apellido || !email || !paisNacimiento || !edad || !ciudadResidencia || !paisResidencia) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          error: "Nombre, apellido, email, país de nacimiento, edad, ciudad y país de residencia son obligatorios."
        }
      };
      return;
    }

    const tableClient = getTableClient();

    const reserva = {
      partitionKey: "evento-brice",
      rowKey: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      nombre,
      apellido,
      email,
      telefono,
      paisNacimiento,
      edad,
      ciudadResidencia,
      paisResidencia,
      asistentes,
      mensaje,
      fecha: new Date().toISOString()
    };

    // 1. GUARDAR EN TABLE STORAGE
    await tableClient.createEntity(reserva);

    // 2. ENVIAR EMAIL (NO BLOQUEANTE)
    try {
      await enviarEmailConfirmacion(reserva, context);
    } catch (emailError) {
      context.log.error("Error enviando email:", emailError);
    }

    // 3. RESPUESTA OK
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        ok: true,
        message: "Reserva guardada correctamente."
      }
    };

  } catch (error) {
    context.log.error("Error guardando reserva:", error);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        ok: false,
        error: "Error guardando la reserva."
      }
    };
  }
};