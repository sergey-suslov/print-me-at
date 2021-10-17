import { Test, TestingModule } from '@nestjs/testing'
import { Redis } from 'ioredis'
import { mocked } from 'ts-jest/utils'
import { MessageSchedulerModule } from './message-scheduler.module'
import { MessageSchedulerService } from './message-scheduler.service'

class GenericStub {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public zadd() {}
}

interface StubbedThings {
  redis: Redis
}

describe('MessageSchedulerService', () => {
  let module: TestingModule
  let sut: MessageSchedulerService
  const stubs: StubbedThings = {} as StubbedThings

  const providers = [
    { provide: 'REDIS', useClass: GenericStub },
    { provide: MessageSchedulerService, useClass: MessageSchedulerService },
  ]

  beforeAll(async () => {
    module = await Test.createTestingModule({ providers }).compile()
    stubs.redis = module.get<Redis>('REDIS')
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
          setName: 'scheduledMessages',
        },
      }

      jest.spyOn(stubs.redis, 'zadd').mockResolvedValue(Promise.resolve(1))

      //ACT
      await sut.scheduleMessage(td.request.message, td.request.time)

      //ASSERT
      expect(mocked(stubs.redis.zadd).mock.calls[0][0]).toEqual(
        td.request.setName,
      )
      expect(mocked(stubs.redis.zadd).mock.calls[0][1][0]).toEqual(
        td.request.time.getTime(),
      )
      expect(mocked(stubs.redis.zadd).mock.calls[0][1][1]).toEqual(
        td.request.message,
      )
    })
  })
})
