import { Module } from '@nestjs/common';
import { AppController } from '@url-shortener/modules/app.controller';
import { AppService } from '@url-shortener/modules/app.service';
import { UsersModule } from '@url-shortener/modules/users/users.module';
import { UrlsModule } from '@url-shortener/modules/urls/urls.module';

@Module({
  imports: [UsersModule, UrlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
