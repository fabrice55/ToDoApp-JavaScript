import { Request, Response, NextFunction } from 'express';

export function passwordProtected(req: Request, res: Response, next: NextFunction): void {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"');
  if (req.headers.authorization === "Basic bGVhcm46amF2YXNjcmlwdA==") {
    next();
  } else {
    res.status(401).send("Authentication required");
  }
}
