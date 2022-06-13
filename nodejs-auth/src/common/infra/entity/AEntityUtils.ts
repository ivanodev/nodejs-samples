import AppError from "@common/errors/app-error";

class EntityUtils {

  static copyFieldsValue( source: any, target: any, targetKeys: string[] ): object {

    if (!source) {
      throw new AppError("Error when props value copy between entities. The source entity is null or undefined.");
    }

    if (!target) {
      throw new AppError("Error when props value copy between entities. The target entity is null or undefined.");
    }

    if (!targetKeys || targetKeys.length === 0) {
      throw new AppError("Error when props value copy between entities. The target keys is null, undefined or empty.");
    }

    targetKeys.forEach( key => {

      if ( source.hasOwnProperty(key) === true) {

        target[key] = Reflect.get(source, key);
      }
    });

    return target;
  }

}

export default EntityUtils;