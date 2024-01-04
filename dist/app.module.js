"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const goals_module_1 = require("./goals/goals.module");
const post_module_1 = require("./posts/post.module");
const redisStore = require("cache-manager-redis-store");
const chat_module_1 = require("./chat/chat.module");
const socket_module_1 = require("./socket/socket.module");
const newsletter_module_1 = require("./newsletter/newsletter.module");
const file_module_1 = require("./file/file.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            common_1.CacheModule.register({
                isGlobal: true,
                store: redisStore,
                host: 'localhost',
                port: 6379
            }),
            mongoose_1.MongooseModule.forRoot(new config_1.ConfigService().get('MONGO_URI')),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            goals_module_1.GoalsModule,
            post_module_1.PostModule,
            chat_module_1.ChatModule,
            newsletter_module_1.NewsletterModule,
            file_module_1.FileModule,
            socket_module_1.SocketModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map