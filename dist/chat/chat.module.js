"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
const chat_model_1 = require("./models/chat.model");
const group_model_1 = require("./models/group.model");
const contacts_model_1 = require("./models/contacts.model");
const chat_gateway_1 = require("../gateway/chat.gateway");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
let ChatModule = exports.ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "contacts", schema: contacts_model_1.ContactSchema },
                { name: "chats", schema: chat_model_1.ChatSchema },
                { name: "groups", schema: group_model_1.GroupSchema }
            ]),
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map