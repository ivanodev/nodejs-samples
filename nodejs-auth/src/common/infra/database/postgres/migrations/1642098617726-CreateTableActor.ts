import { MigrationInterface, QueryRunner, Table, TableColumnOptions } from "typeorm";
import { registryManipulationInfo as registryTrackingInfo } from "./DefaultColumnProvider";

export default class CreateTableActor1642098617726 implements MigrationInterface {

    private tableName = 'actor';

    public async up(queryRunner: QueryRunner): Promise<void> {

        let columns: TableColumnOptions[] = [
            {
                name: 'id',
                type: 'char(36)',
                isPrimary: true,
                generationStrategy: "uuid",
                default: 'uuid_generate_v4()',
            },
            {
                name: 'firstName',
                type: 'varchar(100)',
                isNullable: false,
            },
            {
                name: 'lastName',
                type: 'varchar(100)',
                isNullable: true,
            },
            {
                name: 'actorType',
                type: 'enum',
                enumName: 'ActorType',
                enum: ['0', '1', '2', '3', '4', '5'],
                isArray: true,
                isNullable: false,
            },
            {
                name: 'personType',
                type: 'enum',
                enum: ['0', '1'],
                enumName: 'PersonType',
                isNullable: false                    
            },
            {
                name: 'email',
                type: 'varchar(100)',
                isUnique: true,
                isNullable: true
            },                   
            {
                name: 'isActive',
                type: 'smallint',
                default: 1,
            },   
        ];

        columns = columns.concat(registryTrackingInfo);

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
