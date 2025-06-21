// Valida que un string tenga longitud mínima y/o máxima
export const validateString = (str, min = null, max = null) => {
  if (typeof str !== "string") return false;
  if (min !== null && str.length < min) return false;
  if (max !== null && str.length > max) return false;
  return true;
};

// Valida formato básico de email
export const validateEmail = (email) => {
  if (typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


// mínimo 8 caracteres, al menos un número y una mayúscula
export const validatePassword = (password) => {
  if (typeof password !== "string") return false;
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;      // debe tener al menos un número
  if (!/[A-Z]/.test(password)) return false;   // debe tener al menos una mayúscula
  return true;
};

// Validación para registro de usuario
export const validateRegisterUser = (data = {}) => {
  const { name, email, password } = data;
  if (!name || !validateString(name, 8, null)) {
    return { error: true, message: "Nombre inválido" };
  }
  if (!email || !validateEmail(email)) {
    return { error: true, message: "Email inválido" };
  }
  if (!password || !validatePassword(password)) {
    return { error: true, message: "Contraseña inválida" };
  }
  return { error: false, message: "" };
};

// Validación para login de usuario
export const validateLoginUser = (data = {}) => {
  const { email, password } = data;
  if (!email || !validateEmail(email)) {
    return { error: true, message: "Email inválido" };
  }
  if (!password || !validatePassword(password)) {
    return { error: true, message: "Contraseña inválida" };
  }
  return { error: false, message: "" };
};
