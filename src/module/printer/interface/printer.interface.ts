export interface PrintMessagePayload {
  message: string
  time: Date
}

export interface Printer {
  printAt(payload: PrintMessagePayload): Promise<void>
}
