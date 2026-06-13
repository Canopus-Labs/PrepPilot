export const getPasswordStrength = (password) => {
  const checks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength = "Weak";

  if (score >= 4) strength = "Medium";
  if (score === 5) strength = "Strong";

  return {
    checks,
    score,
    strength,
  };
};