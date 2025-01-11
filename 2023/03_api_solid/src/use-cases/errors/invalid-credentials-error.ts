export class InvalidCredentialError extends Error {
  constructor() {
    super("E-mail ou senha inválido!");
  }
}