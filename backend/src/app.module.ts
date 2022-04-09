import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import typeorm from '@app/config/typeorm'
import { TagModule } from '@app/modules/tag/tag.module'
import { UserModule } from '@app/modules/user/user.module'
import { AuthMiddleware } from '@app/modules/user/middlewares/auth.middleware'

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        TagModule,
        UserModule,
    ],
    controllers: [],
    providers: []
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}