const { TableClient } = require("@azure/data-tables");

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
    const paisNacimiento = (data.paisNacimiento || "").trim();
    const edad = String(data.edad || "").trim();
    const ciudadResidencia = (data.ciudadResidencia || "").trim();
    const paisResidencia = (data.paisResidencia || "").trim();
    const asistentes = String(data.asistentes || "").trim();
    const mensaje = (data.mensaje || "").trim();

    if (!nombre || !apellido || !email || !paisNacimiento || !edad || !ciudadResidencia || !paisResidencia) {
      context.res = {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        },
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