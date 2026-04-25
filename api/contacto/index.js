const { TableClient } = require("@azure/data-tables");
const { EmailClient } = require("@azure/communication-email");

function getTableClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.TABLE_NAME || "reservasEventoprimero";

  return TableClient.fromConnectionString(connectionString, tableName);
}

function getEmailClient() {
  return new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);
}

async function enviarEmailConfirmacion(reserva, context) {
  const client = getEmailClient();

  const message = {
    senderAddress: "DoNotReply@graxiano.com",
    content: {
      subject: "Reserva confirmada - Evento Brice",
      plainText: `Hola ${reserva.nombre}, hemos recibido correctamente tu solicitud para el evento.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
          <h2>Reserva confirmada</h2>

          <p>Hola <strong>${reserva.nombre}</strong>,</p>

          <p>Hemos recibido correctamente tu solicitud para el evento.</p>

          <p><strong>Datos de la reserva:</strong></p>
          <ul>
            <li><strong>Nombre:</strong> ${reserva.nombre} ${reserva.apellido}</li>
            <li><strong>Email:</strong> ${reserva.email}</li>
            <li><strong>Teléfono:</strong> ${reserva.telefono || "No indicado"}</li>
            <li><strong>Asistentes:</strong> ${reserva.asistentes || "No indicado"}</li>
            <li><strong>Ciudad:</strong> ${reserva.ciudadResidencia}</li>
            <li><strong>País:</strong> ${reserva.paisResidencia}</li>
          </ul>

          <p>Te contactaremos pronto con más detalles.</p>

          <br>
          <p><strong>Equipo Brice Eventos</strong></p>
          <p style="font-size: 12px; color: #777;">Powered by Graxiano</p>
        </div>
      `
    },
    recipients: {
      to: [{ address: reserva.email }]
    }
  };

  const poller = await client.beginSend(message);
  await poller.pollUntilDone();

  context.log("Email de confirmación enviado a:", reserva.email);
}

async function enviarEmailAdmin(reserva, context) {
  const client = getEmailClient();

  const message = {
    senderAddress: "DoNotReply@graxiano.com",
    content: {
      subject: `Nueva reserva recibida - ${reserva.nombre} ${reserva.apellido}`,
      plainText: `
Nueva reserva recibida.

Nombre: ${reserva.nombre} ${reserva.apellido}
Email: ${reserva.email}
Teléfono: ${reserva.telefono || "No indicado"}
País nacimiento: ${reserva.paisNacimiento}
Edad: ${reserva.edad}
Ciudad residencia: ${reserva.ciudadResidencia}
País residencia: ${reserva.paisResidencia}
Asistentes: ${reserva.asistentes || "No indicado"}
Mensaje: ${reserva.mensaje || "Sin mensaje"}
Privacidad aceptada: ${reserva.privacyAccepted}
Fecha aceptación privacidad: ${reserva.privacyAcceptedAt}
Fecha reserva: ${reserva.fecha}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
          <h2>Nueva reserva recibida</h2>

          <p><strong>Nombre:</strong> ${reserva.nombre} ${reserva.apellido}</p>
          <p><strong>Email:</strong> ${reserva.email}</p>
          <p><strong>Teléfono:</strong> ${reserva.telefono || "No indicado"}</p>
          <p><strong>País nacimiento:</strong> ${reserva.paisNacimiento}</p>
          <p><strong>Edad:</strong> ${reserva.edad}</p>
          <p><strong>Ciudad residencia:</strong> ${reserva.ciudadResidencia}</p>
          <p><strong>País residencia:</strong> ${reserva.paisResidencia}</p>
          <p><strong>Asistentes:</strong> ${reserva.asistentes || "No indicado"}</p>
          <p><strong>Mensaje:</strong> ${reserva.mensaje || "Sin mensaje"}</p>
          <p><strong>Privacidad aceptada:</strong> ${reserva.privacyAccepted}</p>
          <p><strong>Fecha aceptación privacidad:</strong> ${reserva.privacyAcceptedAt}</p>
          <p><strong>Fecha reserva:</strong> ${reserva.fecha}</p>
        </div>
      `
    },
    recipients: {
      to: [{ address: "admin@graxiano.com" }]
    }
  };

  const poller = await client.beginSend(message);
  await poller.pollUntilDone();

  context.log("Email de aviso enviado a admin@graxiano.com");
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
    const privacyAccepted = Boolean(data.privacyAccepted);
    const privacyAcceptedAt = data.privacyAcceptedAt || new Date().toISOString();

    if (
      !nombre ||
      !apellido ||
      !email ||
      !paisNacimiento ||
      !edad ||
      !ciudadResidencia ||
      !paisResidencia ||
      !privacyAccepted
    ) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          ok: false,
          error:
            "Nombre, apellido, email, país de nacimiento, edad, ciudad, país de residencia y aceptación de privacidad son obligatorios."
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
      privacyAccepted,
      privacyAcceptedAt,
      fecha: new Date().toISOString()
    };

    await tableClient.createEntity(reserva);

    try {
      await enviarEmailConfirmacion(reserva, context);
      await enviarEmailAdmin(reserva, context);
    } catch (emailError) {
      context.log.error("Error enviando email:", emailError);
    }

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