import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1644173890803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Users",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name:"email",
                        type:"varchar"
                    },
                    {
                        name:"admin",
                        type:"boolean",
                        default: false
                    },
                    {
                        name:"created_at",
                        type:"tipestamp",
                        default:"now()"
                    },
                    {
                        name:"updated_at",
                        type:"tipestamp",
                        default:"now()"
                    }
                ]
            })

        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("Users");

    }

}
