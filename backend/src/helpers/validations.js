// Valida que sea un string no vacío
export const validateString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

// Valida email con una regla mínima
export const validateEmail = (email) => {
  return typeof email === "string" && email.includes("@");
};

// Valida que la contraseña tenga al menos 6 caracteres
export const validatePassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

// Validación para registro
export const validateRegisterUser = (data = {}) => {
  const { name, email, password } = data;

  if (!validateString(name)) {
    return { error: true, message: "Nombre inválido" };
  }

  if (!validateEmail(email)) {
    return { error: true, message: "Email inválido" };
  }

  if (!validatePassword(password)) {
    return { error: true, message: "Contraseña inválida (mínimo 6 caracteres)" };
  }

  return { error: false, message: "" };
};

// Validación para login
export const validateLoginUser = (data = {}) => {
  const { email, password } = data;

  if (!validateEmail(email)) {
    return { error: true, message: "Email inválido" };
  }

  if (!validatePassword(password)) {
    return { error: true, message: "Contraseña inválida" };
  }

  return { error: false, message: "" };
};