export class CustomError extends Error {
  public statusCode: number;
  public errorCode: string;
  public errorDescription: string;

  constructor(statusCode: number, errorCode: string, errorDescription: string) {
    super(errorDescription);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}
