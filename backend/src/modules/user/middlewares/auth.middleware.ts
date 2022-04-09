import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response, Request } from 'express'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/config/jwt'
import { UserService } from '@app/modules/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor( private readonly userService: UserService) {}

    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if (!req.headers.authorization){
            req.user = null
            next()
            return
        }

        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodeToken = verify(token, JWT_SECRET)
            const user = await this.userService.findById(decodeToken.id)
            req.user = user
            next()
        } catch (e) {
            req.user = null
            next()
        }
    }

}