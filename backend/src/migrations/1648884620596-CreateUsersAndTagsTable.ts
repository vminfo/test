import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersAndTagsTable1648884620596 implements MigrationInterface {
    name = 'CreateUsersAndTagsTable1648884620596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "city" character varying NOT NULL DEFAULT 'Йошкар-Ола', "school" character varying NOT NULL DEFAULT 'Лицей №28 г.Йошкар-Олы', "yearStudy" integer NOT NULL DEFAULT '7', "liter" character varying NOT NULL DEFAULT 'A', "points" integer NOT NULL DEFAULT '0', "isBanned" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, "createdAt" character varying NOT NULL DEFAULT '21.12.21', "role" character varying NOT NULL DEFAULT '1', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
