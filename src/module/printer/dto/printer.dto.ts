import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'

export class PrinterMessagePayloadDto {
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Message to print',
    required: true,
  })
  message!: string
}
