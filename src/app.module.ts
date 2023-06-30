import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RedirectMiddleware } from './redirect.middleware';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Redirect all requests to other Url
    consumer.apply(RedirectMiddleware).forRoutes('*');
  }
}
