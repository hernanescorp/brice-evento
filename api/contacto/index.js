const { TableClient } = require("@azure/data-tables");
const { EmailClient } = require("@azure/communication-email");

function getTableClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.TABLE_NAME || "reservasEventoprimero";
  return TableClient.fromConnectionString(connectionString, tableName);
}

async function enviarEmailConfirmacion(reserva, context) {
  try {
    const client = new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);

    const message = {
      senderAddress: "DoNotReply@graxiano.com", // IMPORTANTE
      content: {
        subject: "Reserva confirmada - Evento Brice",
        plainText: `Hola ${reserva.nombre}, tu reserva ha sido recibida correctamente.`,
        html: `
          <h2>Reserva confirmada</h2>
          <p>Hola <strong>${reserva.nombre}</strong>,</p>
          <p>Tu solicitud ha sido recibida correctamente.</p>
          <p>Te contactaremos pronto.</p>
        `
      },
      recipients: {
        to: [{ address: reserva.email }]
      }
    };

    const poller = await client.beginSend(message);
    await poller.pollUntilDone();

    context.log("EMAIL ENVIADO OK");
  } catch (error) {
    context.log.error("ERROR EMAIL:", error);
  }
}

module.exports = async function (context, req) {
  try {
    const data = req.body || {};

    const nombre = (data.nombre || "").trim();
    const apellido = (data.apellido || "").trim();
    const email = (data.email || "").trim();

    if (!nombre || !apellido || !email) {
      context.res = {
        status: 400,
        body: { error: "Faltan campos obligatorios" }
      };
      return;
    }

    const tableClient = getTableClient();

    const reserva = {
      partitionKey: "evento-brice",
      rowKey: `${Date.now()}`,
      nombre,
      apellido,
      email,
      fecha: new Date().toISOString()
    };

    await tableClient.createEntity(reserva);

    // 💥 AQUÍ EL EMAIL
    await enviarEmailConfirmacion(reserva, context);

    context.res = {
      status: 200,
      body: { ok: true }
    };

  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: { error: "Error interno" }
    };
  }
};