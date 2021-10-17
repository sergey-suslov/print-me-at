import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class PrinterMessagePayloadDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Date to print at',
    required: true,
  })
  time!: Date

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Message to print',
    required: true,
  })
  message!: string
}
