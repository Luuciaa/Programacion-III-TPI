export const getColorCuota = (estado) => {
  switch (estado) {
    case "al-dia":
      return "success";
    case "vencido":
      return "danger";
    default:
      return "secondary";
  }
};

export const getTextoCuota = (estado) => {
  return estado === "al-dia" ? "Cuota al día" : "Cuota vencida";
};
