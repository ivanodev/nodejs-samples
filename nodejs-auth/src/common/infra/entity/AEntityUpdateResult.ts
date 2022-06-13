import AEntity from "./AEntity";

class AEntityUpdateResult extends AEntity {

  private id: string;
  private updateResult: any;

  constructor(id: string, updateResult: any) {
    super();
    this.id = id;
    this.updateResult = updateResult;
  }

  public getId(): any {

    return this.id;
  }

  public getUpdateResult(): any {

    return this.updateResult;
  }
}

export default AEntityUpdateResult;