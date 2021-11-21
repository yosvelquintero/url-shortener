import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'hello',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('world')
  getHello(): string {
    return this.appService.getHello();
  }
}
