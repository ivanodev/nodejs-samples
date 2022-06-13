import cls from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const getContext = () => {

  return cls.getNamespace('API_REQUEST_CONTEXT');
}

export default class ServerContext {

  static createNamespace = () => {
  
    cls.createNamespace('API_REQUEST_CONTEXT');
  }
  
  static initContext = () => {
  
    return (req: Request, res: Response, next: NextFunction) => {
  
      var context = getContext();
      context?.run(() => {
  
        context?.bindEmitter(req);
        context?.bindEmitter(res);
  
        const contextId = uuidv4();
        context?.set('contextId', contextId);
  
        next();
      });
  
    };
  
  }
  
  static getId = () => {
  
    const context = getContext();
    return context?.get('contextId');
  
  }
  
  static getDBConnection = () => {
  
    const context = getContext();
    return context?.get('dbConn');
    
  }
  
  static set = ( key: string, item: any ) => {
  
    const context = getContext();
    context?.set( key, item );        
  
  }
  
  static get = (key: string) => {
  
    const context = getContext();
    return context?.get( key );
  
  }
  
  static getNS = () => {
    return cls.getNamespace('API_REQUEST_CONTEXT');
  }  
}
