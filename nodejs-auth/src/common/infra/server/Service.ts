import AppError from "@common/errors/app-error";
import context from "./ServerContext";

class Service {

  protected context = context;
  protected userLogged = context.get('userLogged');

  constructor() {

    if (!this.userLogged) {

      throw new AppError(
        'Unauthorized access. The connection to the server will be terminated. Access violation detected.',
        401
      );

    }

  }

}

export default Service;