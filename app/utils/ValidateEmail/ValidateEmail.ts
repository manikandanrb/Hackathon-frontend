export function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[A-Za-z]{2,7})+$/.test(email);
}
