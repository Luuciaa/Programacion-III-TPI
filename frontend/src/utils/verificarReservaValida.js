export const verificarReservaValida = (fecha, hora) => {
  const ahora = new Date();
  const [anio, mes, dia] = fecha.split("-");
  const [horaStr, minutoStr] = hora.split(":");

  const reserva = new Date(anio, mes - 1, dia, horaStr, minutoStr);
  const diferenciaMs = reserva - ahora;
  const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);

  if (diferenciaHoras >= 4) {
    return {
      valido: true,
      mensaje: "La reserva puede ser cancelada.",
    };
  } else {
    return {
      valido: false,
      mensaje: "La reserva solo puede cancelarse hasta 4 horas antes.",
    };
  }
};
