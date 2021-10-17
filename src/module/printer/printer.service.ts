import { Injectable, NotImplementedException } from '@nestjs/common'
import { Printer, PrintMessagePayload } from './interface/printer.interface'

@Injectable()
export class PrinterService implements Printer {
  printAt(payload: PrintMessagePayload): Promise<void> {
    throw new NotImplementedException()
  }
}
