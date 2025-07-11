const validator = require('validator');

function isValidName(name) {
  const doesExceedLength = name.length > 30; 
  const sanitizedInput = validator.escape(name).trim();
  const alphaOnly = /^[A-Za-z]+$/.test(sanitizedInput);
  const sanitized = alphaOnly && !doesExceedLength ? sanitizedInput : null;
  return {sanitized , errors : {doesExceedLength , alphaOnly}}
}


function validateEmail(rawEmail) {
  // Sanitize: trim and normalize
  const email = validator.trim(rawEmail);
  const normalizedEmail = validator.normalizeEmail(email);

  // Validate
  if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
    return { valid: false, email: null };
  }

  return { valid: true, email: normalizedEmail };
}
// utils/validatePassword.js

function validatePassword(password) {
  const isLongEnough = password.length >= 4;
  const hasDigit = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  const valid = isLongEnough && hasDigit && hasUppercase;

  return { valid, errors: {
    length: isLongEnough,
    digit: hasDigit,
    uppercase: hasUppercase
  }};
}

module.exports = validatePassword;


module.exports = {
  validateEmail , 
  validatePassword,
  isValidName
}
