import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { resolve } from 'path';

const ENV_PATH = resolve(__dirname, '../../../.env');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    UsersModule,
    TracksModule,
    PlaylistModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
