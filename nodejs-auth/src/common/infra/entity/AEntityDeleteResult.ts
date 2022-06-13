import AEntity from "./AEntity";

class AEntityDeleteResult extends AEntity {

  private deleteResult: any;

  constructor(deleteResult: any){
    super();
    this.deleteResult = deleteResult;
  }

  public getDeleteResult(): any {

    return this.deleteResult;
  }

}

export default AEntityDeleteResult;