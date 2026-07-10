export interface LogContext {
  [key: string]: string | number | boolean | undefined;
}

export function logError(moduleName: string, description: string, context: LogContext): void {
  console.error(`[${moduleName}][ERROR] ${description} | context: ${JSON.stringify(context)}`);
}
