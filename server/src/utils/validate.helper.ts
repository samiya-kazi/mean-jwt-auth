export const validateLogin = (
  data: any
): data is { email: string; password: string } => {
  return (
    data.email &&
    data.password &&
    typeof data.email === "string" &&
    typeof data.password === "string"
  );
};

export const validateRegsitration = (
  data: any
): data is { email: string; password: string, name: string, dob: Date | string, gender: 'male' | 'female' | 'others' } => {
  return (
    data.email &&
    data.password &&
    data.name &&
    data.dob &&
    data.gender &&
    typeof data.name === "string" &&
    (data.dob instanceof Date || typeof data.dob === 'string') &&
    (data.gender === "male" || data.gender === "female" || data.gender === "others") &&
    typeof data.email === "string" &&
    typeof data.password === "string"
  );
};