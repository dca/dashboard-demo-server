import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OtelModule } from '@app/otel'
import { DbModule } from '@app/db'
import { UserModule } from './modules/user/user.module'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OtelModule, DbModule, UserModule],
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
  })

  describe('getHello', () => {
    it('should return the result of getHello from the service', async () => {
      const result = 'test string'
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(async () => await Promise.resolve(result))

      expect(await appController.getHello()).toBe(result)
    })
  })

  describe('getHello2', () => {
    it('should return the result of getHello with a name from the service', async () => {
      const testName = 'John'
      const result = `Hello, ${testName}`
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(async (name: string) => await Promise.resolve(`Hello, ${name}`))

      expect(await appController.asyncgetHello2(testName)).toBe(result)
    })
  })
})
