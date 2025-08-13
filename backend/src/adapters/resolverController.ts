import { NextFunction, Request, Response } from "express";

export function resolveController(handleFn: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(handleFn(req, res, next)).catch(err => next(err))
        .catch(e => next(e))
    }
}