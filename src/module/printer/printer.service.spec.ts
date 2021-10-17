import { Test, TestingModule } from '@nestjs/testing'
import { mocked } from 'ts-jest/utils'
import { CustomLoggerService } from '../../shared/helper/custom-logger.service'
import { MessageSchedulerService } from '../message-scheduler/message-scheduler.service'
import { PrinterService } from './printer.service'

class GenericStub {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public scheduleMessage() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public error() {}
}

interface StubbedThings {
  messageScheduler: MessageSchedulerService
}

describe('PrinterService', () => {
  let module: TestingModule
  let sut: PrinterService
  const stubs: StubbedThings = {} as StubbedThings

  const providers = [
    { provide: CustomLoggerService, useClass: GenericStub },
    { provide: MessageSchedulerService, useClass: GenericStub },
    { provide: PrinterService, useClass: PrinterService },
  ]

  beforeAll(async () => {
    module = await Test.createTestingModule({ providers }).compile()
    stubs.messageScheduler = module.get<MessageSchedulerService>(
      MessageSchedulerService,
    )
  })

  beforeEach(async () => {
    jest.resetAllMocks()
    sut = await module.resolve<PrinterService>(PrinterService)
  })

  describe('printAt', () => {
    it('should schedule successfuly', async () => {
      //ARRANGE
      const td = {
        payload: {
          message: 'message',
          time: new Date(),
        },
      }

      jest.spyOn(stubs.messageScheduler, 'scheduleMessage').mockResolvedValue()

      //ACT
      await sut.printAt(td.payload)

      //ASSERT
      expect(
        mocked(stubs.messageScheduler.scheduleMessage).mock.calls[0][0],
      ).toEqual(td.payload.message)
      expect(
        mocked(stubs.messageScheduler.scheduleMessage).mock.calls[0][1],
      ).toEqual(td.payload.time)
    })

    it('should schedule with error', async () => {
      //ARRANGE
      const td = {
        payload: {
          message: 'message',
          time: new Date(),
        },
        error: new Error('Scheduling error'),
      }

      jest
        .spyOn(stubs.messageScheduler, 'scheduleMessage')
        .mockRejectedValue(td.error)

      //ACT
      const promise = sut.printAt(td.payload)

      //ASSERT
      expect(promise).rejects.toThrowError(td.error)
    })
  })
})
