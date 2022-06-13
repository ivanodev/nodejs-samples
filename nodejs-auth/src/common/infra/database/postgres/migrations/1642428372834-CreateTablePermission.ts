import { MigrationInterface, QueryRunner, Table, TableColumnOptions, TableForeignKey } from "typeorm";
import { registryManipulationInfo } from "./DefaultColumnProvider";

export default class CreateTablePermission1642428372834 implements MigrationInterface {

    private tableName = 'permission';

    public async up(queryRunner: QueryRunner): Promise<void> {

        let columns: TableColumnOptions[] = [
            {
                name: 'id',
                type: 'char(36)',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
                name: 'name',
                type: 'varchar',
                isUnique: true,
                isNullable: false,
            },
            {
                name: 'description',
                type: 'varchar',
                isNullable: false
            },
            {
                name: 'parentPermission',
                type: 'char(36)',
                isNullable: true,
            },
            {
                name: 'isActive',
                type: 'smallint',
                default: 1,
            }
        ];

        columns = columns.concat(registryManipulationInfo);

        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: columns
            })
        );

        await queryRunner.createForeignKey(this.tableName, new TableForeignKey({
            name: 'FK_Permission_parentPermission',
            columnNames: ['parentPermission'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permission'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(this.tableName, 'FK_Permission_parentPermission');
        await queryRunner.dropTable(this.tableName);
    }

}
