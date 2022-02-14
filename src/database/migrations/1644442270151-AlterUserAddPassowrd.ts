import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassowrd1644442270151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Users",
            new TableColumn ({
                name: "passowrd",
                type: "varchar",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn("Users","passowrd")
    }

}
