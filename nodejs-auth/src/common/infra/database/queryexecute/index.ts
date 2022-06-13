import { DataType } from '@common/infra/database/enum';
import fs from 'fs';
import path from 'path';
import { getConnection } from 'typeorm';

interface SQLParams {
  [key: string]: any;
}

export default class QueryExecute {

  private sql: string;
  private sqlFileName: string;
  private sqlParam: SQLParams;
  private condition: string;

  constructor(sqlFileName: string) {
    this.sqlFileName = path.normalize(sqlFileName);
  }

  private escapeRegExp(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  private async replaceParams(sqlParams?: SQLParams): Promise<string> {

    const _sql = this.sql ? this.sql : await this.getSql();

    const _sqlParams = sqlParams ? sqlParams : this.sqlParam;
    let sqlParsed: string = _sql;

    let value: any | undefined = undefined;

    if (_sqlParams) {

      let paramsNames: string[] = Object.keys(_sqlParams);

      for await (const paramName of paramsNames) {

        switch (typeof _sqlParams[paramName]) {
          case DataType.STRING:
            value = `'${_sqlParams[paramName]}'`
            break;

          default:
            value = `${_sqlParams[paramName]}`
            break;
        }

        sqlParsed = sqlParsed.replace(new RegExp(this.escapeRegExp(`:${paramName}`), 'g'), value);
      }
    }

    this.sql = sqlParsed;

    return sqlParsed;
  }

  async getSql(): Promise<string> {

    this.sql = await fs.promises.readFile(this.sqlFileName, 'utf-8');
    
    if ( this.condition ) {
      this.sql += ' ' + this.condition;
    }

    return this.sql;
  }

  setParameters(params: SQLParams): void {

    this.sqlParam = params;
  }

  addParameter(params: SQLParams): void {

    const paramNames = Object.keys(params);

    for (const paramName of paramNames) {

      this.sqlParam = {
        ...this.sqlParam,
        [paramName]: params[paramName]
      }
    }
  }

  addCondition(condition: string): void {

    this.condition = condition;
  }

  async execute(): Promise<any[]> {

    await this.replaceParams();
    let sql = this.sql ? this.sql : await this.getSql();
    
    const result = await getConnection().query(sql);

    return result;
  }

  async getRawOne(): Promise<any> {

    await this.replaceParams();
    let sql = this.sql ? this.sql : await this.getSql();
    
    const result = await getConnection().query(sql);

    if (result && Array.isArray(result)) {

      return result.length > 0 ? result[0] : undefined;
    }

    return result;
  }
}

function createQueryExecute(sqlFile: string): QueryExecute {

  return new QueryExecute(sqlFile);
}

export {
  createQueryExecute
}
