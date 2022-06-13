import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableUserRole1642529664986 implements MigrationInterface {

    private tableName = 'userrole';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'char(36)',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'userId',
                        type: 'char(36)',
                        isNullable: false,
                    },
                    {
                        name: 'roleId',
                        type: 'char(36)',
                        isNullable: false,
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: 'FK_UserRole_userId',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: 'FK_UserRole_roleId',
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(this.tableName, 'FK_UserRole_roleId');
        await queryRunner.dropForeignKey(this.tableName, 'FK_UserRole_userId');

        await queryRunner.dropTable(this.tableName);
    }

}
