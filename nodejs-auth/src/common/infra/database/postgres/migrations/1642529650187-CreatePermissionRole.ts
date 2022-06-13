import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreatePermissionRole1642529650187 implements MigrationInterface {

    private tableName = 'permissionrole';

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
                        name: 'permissionId',
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
            name: 'FK_PermissionRole_permissionId',
            columnNames: ['permissionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permission',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: 'FK_PermissionRole_roleId',
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(this.tableName, 'FK_PermissionRole_permissionId');
        await queryRunner.dropForeignKey(this.tableName, 'FK_PermissionRole_roleId');

        await queryRunner.dropTable(this.tableName);
    }

}
