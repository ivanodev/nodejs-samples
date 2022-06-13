import {MigrationInterface, QueryRunner, Table, TableColumnOptions} from "typeorm";
import { registryManipulationInfo } from "./DefaultColumnProvider";

export default class CreateTableRole1642430697550 implements MigrationInterface {

    private tableName = 'role';

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
                isNullable: false,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable(this.tableName);
    }

}
