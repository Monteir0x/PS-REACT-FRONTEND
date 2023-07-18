export class ApiException extends Error {
  public message = ''
  constructor(message: string) {
    super()
    this.message = message
  }
}