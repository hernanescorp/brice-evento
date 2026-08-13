const { TableClient } = require("@azure/data-tables");
const { EmailClient } = require("@azure/communication-email");

const senderAddress = "DoNotReply@graxiano.com";
const adminAddress = "admin@graxiano.com";

function getTableClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.MIRIART_TABLE_NAME || "consultasMiriart";

  return TableClient.fromConnectionString(connectionString, tableName);
}

function getEmailClient() {
  return new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function ensureTableExists(tableClient) {
  try {
    await tableClient.createTable();
  } catch (error) {
    if (error.statusCode !== 409) {
      throw error;
    }
  }
}

async function enviarEmailConfirmacion(consulta, context) {
  const client = getEmailClient();

  const nombre = escapeHtml(consulta.nombre);
  const tipoEvento = escapeHtml(consulta.tipoEvento);
  const fechaCiudad = escapeHtml(consulta.fechaCiudad);
  const servicio = escapeHtml(consulta.servicio || "No indicado");

  const message = {
    senderAddress,
    content: {
      subject: "Consulta recibida - Miriart Studio",
      plainText: `Hola ${consulta.nombre}, hemos recibido correctamente tu consulta para Miriart Studio.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
          <h2>Consulta recibida</h2>
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Hemos recibido correctamente tu consulta para Miriart Studio.</p>
          <p><strong>Datos de la consulta:</strong></p>
          <ul>
            <li><strong>Nombre:</strong> ${nombre}</li>
            <li><strong>Email:</strong> ${escapeHtml(consulta.email)}</li>
            <li><strong>Tipo de evento:</strong> ${tipoEvento}</li>
            <li><strong>Fecha y ciudad:</strong> ${fechaCiudad}</li>
            <li><strong>Servicio:</strong> ${servicio}</li>
          </ul>
          <p>Miriam o el equipo de Graxiano te contactara pronto con mas detalles.</p>
          <br>
          <p><strong>Miriart Studio</strong></p>
          <p style="font-size: 12px; color: #777;">Powered by Graxiano</p>
        </div>
      `,
    },
    recipients: {
      to: [{ address: consulta.email }],
    },
  };

  const poller = await client.beginSend(message);
  await poller.pollUntilDone();

  context.log("Email de confirmacion enviado a:", consulta.email);
}

async function enviarEmailAdmin(consulta, context) {
  const client = getEmailClient();

  const message = {
    senderAddress,
    content: {
      subject: `Nueva consulta Miriart - ${consulta.nombre}`,
      plainText: `
Nueva consulta recibida.

Nombre: ${consulta.nombre}
Email: ${consulta.email}
Tipo de evento: ${consulta.tipoEvento}
Fecha y ciudad: ${consulta.fechaCiudad}
Servicio: ${consulta.servicio || "No indicado"}
Mensaje: ${consulta.mensaje || "Sin mensaje"}
Privacidad aceptada: ${consulta.privacyAccepted}
Fecha aceptacion privacidad: ${consulta.privacyAcceptedAt}
Fecha consulta: ${consulta.fecha}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
          <h2>Nueva consulta Miriart</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(consulta.nombre)}</p>
          <p><strong>Email:</strong> ${escapeHtml(consulta.email)}</p>
          <p><strong>Tipo de evento:</strong> ${escapeHtml(consulta.tipoEvento)}</p>
          <p><strong>Fecha y ciudad:</strong> ${escapeHtml(consulta.fechaCiudad)}</p>
          <p><strong>Servicio:</strong> ${escapeHtml(consulta.servicio || "No indicado")}</p>
          <p><strong>Mensaje:</strong> ${escapeHtml(consulta.mensaje || "Sin mensaje")}</p>
          <p><strong>Privacidad aceptada:</strong> ${consulta.privacyAccepted}</p>
          <p><strong>Fecha aceptacion privacidad:</strong> ${escapeHtml(consulta.privacyAcceptedAt)}</p>
          <p><strong>Fecha consulta:</strong> ${escapeHtml(consulta.fecha)}</p>
        </div>
      `,
    },
    recipients: {
      to: [{ address: adminAddress }],
    },
  };

  const poller = await client.beginSend(message);
  await poller.pollUntilDone();

  context.log(`Email de aviso enviado a ${adminAddress}`);
}

module.exports = async function (context, req) {
  try {
    const data = req.body || {};

    const nombre = (data.nombre || "").trim();
    const email = (data.email || "").trim();
    const tipoEvento = (data.tipoEvento || "").trim();
    const fechaEvento = (data.fechaEvento || "").trim();
    const ciudadEvento = (data.ciudadEvento || "").trim();
    const fechaCiudad = (data.fechaCiudad || `${fechaEvento} ${ciudadEvento}`.trim()).trim();
    const servicio = (data.servicio || "").trim();
    const mensaje = (data.mensaje || "").trim();
    const privacyAccepted = data.privacyAccepted !== false;
    const privacyAcceptedAt = data.privacyAcceptedAt || new Date().toISOString();

    if (!nombre || !email || !tipoEvento || !fechaCiudad) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          ok: false,
          error: "Nombre, email, tipo de evento, fecha y ciudad son obligatorios.",
        },
      };
      return;
    }

    const tableClient = getTableClient();
    await ensureTableExists(tableClient);

    const consulta = {
      partitionKey: "miriart-studio",
      rowKey: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      nombre,
      email,
      tipoEvento,
      fechaEvento,
      ciudadEvento,
      fechaCiudad,
      servicio,
      mensaje,
      privacyAccepted,
      privacyAcceptedAt,
      fecha: new Date().toISOString(),
    };

    await tableClient.createEntity(consulta);

    try {
      await enviarEmailConfirmacion(consulta, context);
      await enviarEmailAdmin(consulta, context);
    } catch (emailError) {
      context.log.error("Error enviando email:", emailError);
    }

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        ok: true,
        message: "Consulta enviada correctamente.",
      },
    };
  } catch (error) {
    context.log.error("Error guardando consulta:", error);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        ok: false,
        error: "Error enviando la consulta.",
      },
    };
  }
};
