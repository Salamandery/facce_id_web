export default function GetValidationErrors(err) {
  const validationErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
