import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

export abstract class BaseRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  protected abstract configureRoutes(): void;

  protected bindHandler(
    handler: (req: Request, res: Response, next?: NextFunction) => Promise<any>
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  }

  public getRouter(): Router {
    return this.router;
  }
}
