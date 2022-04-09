import { ConnectionOptions } from 'typeorm'

const dir = __dirname.replace('/config', '')

const typeorm: ConnectionOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'vova',
    password: '123',
    database: 'vinfedb',
    entities: [dir + '/modules/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [dir + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'scr/migrations'
    }
}
export default typeorm