import { TableColumnOptions } from "typeorm";

export const registryManipulationInfo = [  
  {
    name: 'createdAt',
    type: 'timestamp',
    isNullable: false,
    default: 'NOW()'
  },
  {
    name: 'updatedAt',
    type: 'timestamp',
    isNullable: true,
    default: null
  },
  {
    name: 'deactivatedAt',
    type: 'timestamp',
    isNullable: true,
    default: null
  },
  {
    name: 'createdBy',
    type: 'varchar(100)',
    isNullable: false,
  },
  {
    name: 'updatedBy',
    type: 'varchar(100)',
    isNullable: true,
  },
  {
    name: 'deactivatedBy',
    type: 'varchar(100)',
    isNullable: true,
  }
] as TableColumnOptions[];