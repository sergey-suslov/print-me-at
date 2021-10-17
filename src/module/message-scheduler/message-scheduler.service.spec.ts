import { Test, TestingModule } from '@nestjs/testing'
import { Queue } from 'bull'
import { mocked } from 'ts-jest/utils'
import { MessageSchedulerModule } from './message-scheduler.module'
import { MessageSchedulerService } from './message-scheduler.service'

class GenericStub {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public add() {}
}

interface StubbedThings {
  scheduledMessagesQueue: Queue
}

describe('MessageSchedulerService', () => {
  let module: TestingModule
  let sut: MessageSchedulerService
  const stubs: StubbedThings = {} as StubbedThings

  const providers = [
    { provide: 'BullQueue_scheduledMessages', useClass: GenericStub },
    { provide: MessageSchedulerService, useClass: MessageSchedulerService },
  ]

  beforeAll(async () => {
    module = await Test.createTestingModule({ providers }).compile()
    stubs.scheduledMessagesQueue = module.get<Queue>(
      'BullQueue_scheduledMessages',
    )
  })

  beforeEach(async () => {
    jest.resetAllMocks()
    sut = await module.resolve<MessageSchedulerService>(MessageSchedulerService)
  })

  describe('scheduledMessages', () => {
    it('should create message scheduler module', async () => {
      new MessageSchedulerModule()
    })
    it('should schedule successfuly', async () => {
      //ARRANGE
      const td = {
        request: {
          message: 'message',
          time: new Date(),
        },
        calledWith: {
          message: 'message',
          time: new Date().getTime(),
        },

        setName: 'scheduledMessages',
      }

      jest
        .spyOn(stubs.scheduledMessagesQueue, 'add')
        .mockResolvedValue(undefined)

      //ACT
      await sut.scheduleMessage(td.request.message, td.request.time)

      //ASSERT
      expect(mocked(stubs.scheduledMessagesQueue.add).mock.calls[0][0]).toEqual(
        td.calledWith,
      )
      expect(
        mocked(stubs.scheduledMessagesQueue.add).mock.calls[0][1],
      ).toHaveProperty(
        'delay',
        Math.max(0, td.request.time.getTime() - Date.now()),
      )
    })
  })
})
