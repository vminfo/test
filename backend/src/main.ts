if (!process.env.IS_TS_NODE) {
    require('module-alias/register')
}

import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/documentions', app, document)
    await app.listen(8000)
}

bootstrap()
