import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@url-shortener/modules/users/users.module';
import { UrlsModule } from '@url-shortener/modules/urls/urls.module';
import { AuthModule } from '@url-shortener/modules/auth/auth.module';
import { ENV } from '@url-shortener/config/index';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
