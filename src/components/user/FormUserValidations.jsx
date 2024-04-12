export const validateName = (value) => {
  if (!/^[a-zA-Z]{2,}$/.test(value)) {
    return "El nombre debe contener solo letras y tener al menos 2 caracteres";
  }
  return "";
};

export const validateLastName = (value) => {
  if (!/^[a-zA-Z]{2,}$/.test(value)) {
    return "El apellido debe contener solo letras y tener al menos 2 caracteres";
  }
  return "";
};

export const validateIdentification = (value) => {
  if (!/^\d{3,}$/.test(value)) {
    return "La identificación debe tener al menos 3 digitos";
  }
  return "";
};
