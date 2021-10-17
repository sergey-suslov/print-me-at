import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
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
  async printMeAt(@Body() payload: PrinterMessagePayloadDto): Promise<void> {
    const result = await this.printerService.printAt(payload)
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
