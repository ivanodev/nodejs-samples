import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableUser1642103224503 implements MigrationInterface {

    private tableName = 'user';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(

            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'char(36)',
                        isPrimary: true,
                    },
                    {
                        name: 'login',
                        type: 'varchar(100)',
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar(100)',
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'randomPassword',
                        type: 'varchar(100)',
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: 'randomPasswordExpiresAt',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'token',
                        type: 'varchar(256)',
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'activeUser',
                        type: 'smallint',
                        default: 0,
                    },
                    {
                        name: 'confirmedUser',
                        type: 'smallint',
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: 'lastAccess',
                        type: 'timestamp',
                        isNullable: true,
                    }
                ]
            })

        );

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: 'FK_UserActor_id',
            columnNames: ['id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'actor',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(this.tableName, 'FK_UserActor_id');

        await queryRunner.dropTable(this.tableName);
    }

}