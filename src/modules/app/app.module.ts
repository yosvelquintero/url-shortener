import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ENV } from '@app/config/index';

import { UsersModule } from '@app/modules/users/users.module';
import { UrlsModule } from '@app/modules/urls/urls.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { AppController } from './app.contoller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(ENV.database.mongodb.mongodbUri),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AuthModule,
    UsersModule,
    UrlsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
