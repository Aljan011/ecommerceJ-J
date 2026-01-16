import type { Request, Response, NextFunction } from "express";

type Validator<T> = (data: unknown) => T;

export const validate =
  <T>(
    validator: Validator<T>,
    property: "body" | "params" | "query" = "body"
  ) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        validator(req[property]);
        next();
      } catch (err: any) {
        return res.status(400).json({
          message: "Validation Error",
          errors: err.errors ?? err,
        });
      }
    };
