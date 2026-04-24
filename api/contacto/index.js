const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

function getTableClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.TABLE_NAME || "reservasEventoprimero";

  return TableClient.fromConnectionString(connectionString, tableName);
}

module.exports = async function (context, req) {
  try {
    const data = req.body || {};

    const nombre = (data.nombre || "").trim();
    const apellido = (data.apellido || "").trim();
    const email = (data.email || "").trim();
    const telefono = (data.telefono || "").trim();
    const asistentes = String(data.asistentes || "").trim();
    const mensaje = (data.mensaje || "").trim();

    if (!nombre || !apellido || !email) {
      context.res = {
        status: 400,
        body: { error: "Nombre, apellido y email son obligatorios." }
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
      asistentes,
      mensaje,
      fecha: new Date().toISOString()
    };

    await tableClient.createEntity(reserva);

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        ok: true,
        message: "Reserva guardada correctamente."
      }
    };

  } catch (error) {
    context.log.error("Error guardando reserva:", error);

    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        ok: false,
        error: "Error guardando la reserva."
      }
    };
  }
};
