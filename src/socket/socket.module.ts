import {Global, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SocketService} from "./socket.service";
import {ChatGateway} from "../gateway/chat.gateway";
import {ContactSchema} from "src/chat/models/contacts.model";
import {ChatSchema} from "src/chat/models/chat.model";
import {GroupSchema} from "src/chat/models/group.model";
import {UserSchema} from "src/users/user.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name:"User",schema:UserSchema},
            {name:"contacts",schema:ContactSchema},
            {name:"chats",schema:ChatSchema},
            {name:"groups",schema:GroupSchema}]),
    ],
    controllers: [],
    providers: [SocketService],
    exports: [SocketService],

})
export class SocketModule {
}
