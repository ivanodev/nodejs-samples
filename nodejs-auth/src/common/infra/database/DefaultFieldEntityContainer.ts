type EntityName = string;

export enum DefaultFieldEntityType {
  created = 0,
  updated = 1,
  deactivated = 2,
  all = 3
}

interface DefaultFieldEntity {
  name: string;
}

class DefaultFieldEntityContainer {

  private static createds: DefaultFieldEntity[] = [];
  private static updateds: DefaultFieldEntity[] = [];
  private static deactivateds: DefaultFieldEntity[] = [];

  private static add(name: EntityName, defaultField: DefaultFieldEntityType): void {

    switch (defaultField) {
      case DefaultFieldEntityType.created:

        const dfec: DefaultFieldEntity = {
          name
        }

        this.createds.push(dfec);

        break;

      case DefaultFieldEntityType.updated:

        const dfeu: DefaultFieldEntity = {
          name
        }

        this.updateds.push(dfeu);

        break;

      case DefaultFieldEntityType.deactivated:

        const dfed: DefaultFieldEntity = {
          name
        }

        this.deactivateds.push(dfed);      
        break;

      default:
        break;
    }
  }

  static registerDefaultField(name: EntityName, defaultFieldTypes: DefaultFieldEntityType | DefaultFieldEntityType[]): void {

    if ( Array.isArray(defaultFieldTypes) ) {

      defaultFieldTypes.forEach(type => this.add(name, type));
    } else {

      this.add(name, defaultFieldTypes);
    }
  }

  static hasCreatedField(name: EntityName): boolean {

    return this.createds.findIndex( item => item.name === name ) >= 0;
  }

  static hasUpdatedField(name: EntityName): boolean {

    return this.updateds.findIndex( item => item.name === name ) >= 0;
  }  

  static hasDeactivatedField(name: EntityName): boolean {

    return this.deactivateds.findIndex( item => item.name === name ) >= 0;
  }  

}

export default DefaultFieldEntityContainer;