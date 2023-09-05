import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {IEnvironmentVariables} from './types';
import {UsersModule} from './users/users.module';
import {GoalsModule} from './goals/goals.module';
import {PostModule} from "src/posts/post.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(new ConfigService<IEnvironmentVariables>().get('MONGO_URI')),
        UsersModule,
        AuthModule,
        GoalsModule,
        PostModule
    ],
})
export class AppModule {
}
