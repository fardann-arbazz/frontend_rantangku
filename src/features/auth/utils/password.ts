export const calculatePasswordStrength = (
  password: string,
  setPasswordStrength: (strength: number) => void,
) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  setPasswordStrength(strength);
};

export const getPasswordStrengthColor = (strength: number) => {
  if (strength <= 25) return "bg-red-500";
  if (strength <= 50) return "bg-orange-500";
  if (strength <= 75) return "bg-yellow-500";
  return "bg-green-500";
};
