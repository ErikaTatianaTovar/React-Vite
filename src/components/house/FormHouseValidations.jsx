export const validateAddress = (value) => {
  if (value.trim().length < 3) {
    return "La dirección debe tener al menos 3 caracteres";
  }
  return "";
};

export const validatePrice = (value) => {
  if (parseInt(value) < 1000000 || parseInt(value) > 999999999999) {
    return "Precio inválido minimo 1.000.000";
  }
  return "";
};

export const validateZipCode = (value) => {
  if (parseInt(value) < 1 || parseInt(value) > 999999) {
    return "Código postal inválido";
  }
  return "";
};

export const validateSize = (value) => {
  if (parseInt(value) < 1 || parseInt(value) > 99999999) {
    return "Tamaño inválido";
  }
  return "";
};

export const validateRooms = (value) => {
  if (parseInt(value) < 1 || parseInt(value) > 20) {
    return "Número de habitaciones inválido";
  }
  return "";
};

export const validateBathrooms = (value) => {
  if (parseInt(value) < 1 || parseInt(value) > 20) {
    return "Número de baños inválido";
  }
  return "";
};

export const validateParking = (value) => {
  if (parseInt(value) < 0 || parseInt(value) > 20) {
    return "Número de parqueadero inválido";
  }
  return "";
};
