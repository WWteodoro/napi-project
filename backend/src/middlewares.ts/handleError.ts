import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { HttpError } from "../errors/HttpError";

export function handleError(err: Error, _: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.status).json({
            message: err.message
        })

    } else {
        res.status(HttpError.INTERNAL_SERVER_ERROR).json({
            message: `Internal Server Error - ${err.message}`
        })
    }

    next()
}