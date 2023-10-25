type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
export class ErrorWithMessage {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}
export class EntityError extends ErrorWithMessage {
  error: ErrorType
  constructor({ message = "Validation error", error }: { message?: string; error: ErrorType }) {
    super({ message, status: 442 })
    this.error = error
  }
}
