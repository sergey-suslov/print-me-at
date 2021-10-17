import {
  Body,
  Controller,
  HttpCode,
  Inject,
  NotImplementedException,
  Post,
} from '@nestjs/common'
import { PrinterMessagePayloadDto } from './dto/printer.dto'
import { Printer } from './interface/printer.interface'
import { PrinterService } from './printer.service'

@Controller('printer')
export class PrinterController {
  constructor(
    @Inject(PrinterService) private readonly printerService: Printer,
  ) {}

  @Post('/printMeAt')
  @HttpCode(200)
  async printMeAt(@Body() options: PrinterMessagePayloadDto): Promise<void> {
    throw new NotImplementedException()
  }
}
