import {Module} from "@nestjs/common";
import {UserController} from "@app/modules/user/user.controller";
import {UserService} from "@app/modules/user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@app/modules/user/user.entity";
import { AuthGuard } from '@app/modules/user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, AuthGuard],
    exports: [UserService]
})
export class UserModule {}