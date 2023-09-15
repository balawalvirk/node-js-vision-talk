import {CacheModule, CacheStore, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {IEnvironmentVariables} from './types';
import {UsersModule} from './users/users.module';
import {GoalsModule} from './goals/goals.module';
import {PostModule} from "src/posts/post.module";
import * as redisStore from 'cache-manager-redis-store';
import {ChatModule} from "src/chat/chat.module";
import {SocketModule} from "src/socket/socket.module";
import {NewsletterModule} from "src/newsletter/newsletter.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        CacheModule.register({
            isGlobal: true,
            store:  redisStore as unknown as CacheStore,
            host: 'localhost', //default host
            port: 6379 //default port
        }),
        MongooseModule.forRoot(new ConfigService<IEnvironmentVariables>().get('MONGO_URI')),
        UsersModule,
        AuthModule,
        GoalsModule,
        PostModule,
        ChatModule,
        NewsletterModule,
        SocketModule
    ],
})
export class AppModule {
}
