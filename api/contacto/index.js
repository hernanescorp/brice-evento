module.exports = async function (context, req) {
  try {
    const data = req.body || {};

    const nombre = (data.nombre || "").trim();
    const apellido = (data.apellido || "").trim();
    const email = (data.email || "").trim();
    const telefono = (data.telefono || "").trim();
    const asistentes = (data.asistentes || "").trim();
    const mensaje = (data.mensaje || "").trim();

    if (!nombre || !apellido || !email) {
      context.res = {
        status: 400,
        body: {
          ok: false,
          error: "Nombre, apellido y email son obligatorios."
        }
      };
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        body: {
          ok: false,
          error: "Email no válido."
        }
      };
      return;
    }

    context.log("Nueva reserva recibida:", {
      nombre,
      apellido,
      email,
      telefono,
      asistentes,
      mensaje,
      fecha: new Date().toISOString()
    });

    context.res = {
      status: 200,
      body: {
        ok: true,
        message: "Reserva recibida correctamente."
      }
    };

  } catch (error) {
    context.log.error("Error en /api/contacto:", error);

    context.res = {
      status: 500,
      body: {
        ok: false,
        error: "Error interno del servidor."
      }
    };
  }
};
