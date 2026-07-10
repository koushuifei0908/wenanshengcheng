export type ErrorContext = Record<string, string | number | boolean>;

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly context: ErrorContext = {},
    public readonly status = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}
